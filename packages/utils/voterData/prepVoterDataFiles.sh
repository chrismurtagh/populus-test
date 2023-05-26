#!/bin/bash
input_directory="."
output_directory="./prepedData"

# Create the output directory if it doesn't exist
mkdir -p "$output_directory"

# Get the total number of .txt files in the input directory
file_count=$(find "$input_directory" -maxdepth 1 -type f -name "*.txt" | wc -l)
processed_count=0

# Process each .txt file in the input directory
for input_file in "$input_directory"/*.txt; do
  # Extract the filename (without extension) from the input file path
  filename=$(basename "$input_file")
  filename_no_ext="${filename%.*}"

  # Set the output file path
  output_file="$output_directory/$filename_no_ext.csv"

  echo "Processing file: $input_file"
  echo "Output file: $output_file"

  # # Remove unwanted special characters from the input file leaving '.', '@',' ','_', '+', '-', '/t'
  sed -e 's/[^[:alnum:].@_+[:space:]\t\/-]//g' "$input_file" > "$input_file.tmp"

  # Add headers to the output file
  echo "countyCode,voterID,nameLast,nameSuffix,nameFirst,nameMiddle,requestedPublicRecordsExemption,residenceAddress1,residenceAddress2,residenceCity,residenceState,residenceZipcode,mailingAddress1,mailingAddress2,mailingAddress3,mailingCity,mailingState,mailingZipcode,mailingCountry,gender,raceCode,birthDate,registrationDate,partyAffiliation,precinct,precinctGroup,precinctSplit,precinctSuffix,voterStatus,congressionalDistrict,houseDistrict,senateDistrict,countyCommissionDistrict,schoolBoardDistrict,daytimeAreaCode,daytimePhoneNumber,daytimePhoneExtension,emailAddress" > "$output_file"

  # Read the modified input file, split lines by tabs, replace tabs with commas, remove carriage returns, remove trailing space from the last field, clean up whitespace in the 8th field, and ensure no empty fields
  sed 's/\t/,/g' "$input_file.tmp" | tr -d '\r' | awk 'BEGIN{FS=OFS=","} {gsub(/^[[:space:]]+|[[:space:]]+$/, "", $NF); gsub(/^[[:space:]]+|[[:space:]]+$/, "", $8); for (i=1; i<=NF; i++) {gsub(/^[[:space:]]+|[[:space:]]+$/, "", $i); if ($i == "") $i = "\"\""} gsub(/[[:space:]]+/, " ", $8); print}' >> "$output_file"

  # Remove the temporary file
  rm "$input_file.tmp"

  # Update progress
  processed_count=$((processed_count + 1))
  echo "Processed file $processed_count of $file_count: $input_file"
  echo "Formatted data saved to: $output_file"
  echo "-----------------------"
done

echo "All files processed."
