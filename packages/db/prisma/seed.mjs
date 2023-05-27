import fs from 'fs'
import csv from 'csv-parser'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const csvFolder = './prisma/importData'
const batchSize = 100 // Adjust the batch size for the voterData processing

function parseDate(dateString) {
	if (!dateString) return null

	const dateParts = dateString.split('/')
	const year = parseInt(dateParts[2])
	const month = parseInt(dateParts[0])
	const day = parseInt(dateParts[1])

	if (isNaN(year) || isNaN(month) || isNaN(day)) {
		return null // Invalid date format, return null
	}

	const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day
		.toString()
		.padStart(2, '0')}`
	return new Date(formattedDate)
}

async function processData(rows) {
	const data = rows.map(row => ({
		countyCode: row.countyCode,
		voterID: row.voterID,
		nameLast: row.nameLast,
		nameSuffix: row.nameSuffix,
		nameFirst: row.nameFirst,
		nameMiddle: row.nameMiddle,
		requestedPublicRecordsExemption:
			row.requestedPublicRecordsExemption === 'Y',
		residenceAddress1: row.residenceAddress1,
		residenceAddress2: row.residenceAddress2,
		residenceCity: row.residenceCity,
		residenceState: 'FL',
		residenceZipcode:
			row.residenceZipcode && !isNaN(row.residenceZipcode)
				? row.residenceZipcode
				: null,
		mailingAddress1: row.mailingAddress1,
		mailingAddress2: row.mailingAddress2,
		mailingAddress3: row.mailingAddress3,
		mailingCity: row.mailingCity,
		mailingState: row.mailingState,
		mailingZipcode:
			row.mailingZipcode && !isNaN(row.mailingZipcode)
				? row.mailingZipcode
				: null,
		mailingCountry: row.mailingCountry,
		gender: row.gender,
		raceCode: parseInt(row.raceCode),
		birthDate: parseDate(row.birthDate),
		registrationDate: parseDate(row.registrationDate),
		partyAffiliation: row.partyAffiliation,
		precinct: row.precinct && !isNaN(row.precinct) ? row.precinct : null,
		precinctGroup:
			row.precinctGroup && !isNaN(row.precinctGroup)
				? parseInt(row.precinctGroup)
				: null,
		precinctSplit: row.precinctSplit ? row.precinctSplit : null,
		precinctSuffix:
			row.precinctSuffix && !isNaN(row.precinctSuffix)
				? parseInt(row.precinctSuffix)
				: null,
		voterStatus: row.voterStatus,
		congressionalDistrict:
			row.congressionalDistrict && !isNaN(row.congressionalDistrict)
				? parseInt(row.congressionalDistrict)
				: null,
		houseDistrict:
			row.houseDistrict && !isNaN(row.houseDistrict)
				? parseInt(row.houseDistrict)
				: null,
		senateDistrict:
			row.senateDistrict && !isNaN(row.senateDistrict)
				? parseInt(row.senateDistrict)
				: null,
		countyCommissionDistrict:
			row.countyCommissionDistrict && !isNaN(row.countyCommissionDistrict)
				? parseInt(row.countyCommissionDistrict)
				: null,
		schoolBoardDistrict:
			row.schoolBoardDistrict && !isNaN(row.schoolBoardDistrict)
				? parseInt(row.schoolBoardDistrict)
				: null,
		daytimeAreaCode:
			row.daytimeAreaCode && !isNaN(row.daytimeAreaCode)
				? parseInt(row.daytimeAreaCode)
				: null,
		daytimePhoneNumber:
			row.daytimePhoneNumber && !isNaN(row.daytimePhoneNumber)
				? parseInt(row.daytimePhoneNumber)
				: null,
		daytimePhoneExtension:
			row.daytimePhoneExtension && !isNaN(row.daytimePhoneExtension)
				? parseInt(row.daytimePhoneExtension)
				: null,
		emailAddress: row.emailAddress
	}))

	await prisma.voterData.createMany({
		data,
		skipDuplicates: true // Skip inserting duplicates if any
	})

	rows.length = 0
}

async function processCSVFile(filePath) {
	return new Promise((resolve, reject) => {
		const rows = []

		const stream = fs
			.createReadStream(filePath)
			.pipe(csv())
			.on('data', row => {
				rows.push(row)

				if (rows.length === batchSize) {
					const batchRows = rows.splice(0, batchSize)
					stream.pause() // Pause the stream while processing the batch
					processData(batchRows)
						.then(() => stream.resume()) // Resume the stream after processing
						.catch(error => reject(error))
				}
			})
			.on('end', async () => {
				try {
					if (rows.length > 0) {
						await processData(rows)
					}
					resolve()
				} catch (error) {
					reject(error)
				}
			})
			.on('error', error => {
				reject(error)
			})
			.on('close', () => {
				// Close the stream when processing is complete
				stream.destroy()
			})
	})
}

async function processCSVFiles() {
	const files = fs.readdirSync(csvFolder)
	for (const file of files) {
		const filePath = `${csvFolder}/${file}`
		try {
			await processCSVFile(filePath)
			console.log(`Processed ${filePath}`)
		} catch (error) {
			console.error('Error importing CSV file:', error)
		}
	}
}

async function main() {
	try {
		await processCSVFiles()
	} catch (error) {
		console.error('Error importing CSV files:', error)
	} finally {
		await prisma.$disconnect()
	}
}

main().catch(error => {
	console.error('Error:', error)
})
