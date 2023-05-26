#!/bin/bash

echo "createing directories for data files"
mkdir commercial
mkdir recreational

echo "Downloading recreational licenses"
cd recreational

# array of URLs for recreational
urls=(
  "https://myfwc.com/media/licenses/recreationalfileinfo.txt"
  "https://myfwc.com/media/licenses/recallcurrentlicenses.txt"
)

# Loop through the URLs and download each one using wget
for url in "${urls[@]}"
do
  echo "Downloading ${url}..."
  curl -O "${url}"
  echo ""
done

echo "Downloading commercial licenses"
cd ../commercial

# array of URLs for commercial
urls=(
  "https://myfwc.com/media/licenses/commercialfileinfo.txt"
  "https://myfwc.com/media/licenses/nrfreshretaildealers.txt"
  "https://myfwc.com/media/licenses/depredationpermitcurrent.txt"
  "https://myfwc.com/media/licenses/sardinelikefishcurrentlicenses.txt"
  "https://myfwc.com/media/licenses/resfreshfishfrogdealerscurr.txt"
  "https://myfwc.com/media/licenses/wholesaledealercurrlicenses.txt"
  "https://myfwc.com/media/licenses/closedseasonspinylobster.txt"
  "https://myfwc.com/media/licenses/retailothercurrentlicenses.txt"
  "https://myfwc.com/media/licenses/nrfreshwholesaledealers.txt"
  "https://myfwc.com/media/licenses/freshwaterfishcurlicenses.txt"
  "https://myfwc.com/media/licenses/saltwaterproductscurrlicenses.txt"
  "https://myfwc.com/media/licenses/stjohnrivliveshrimpcurrlic.txt"
  "https://myfwc.com/media/licenses/nrfreshwholesalebuyers.txt"
  "https://myfwc.com/media/licenses/clsdseasspinylobsplaneves.txt"
  "https://myfwc.com/media/licenses/retailcentralcurrlicenses.txt"
)

# Loop through the URLs and download each one using wget
for url in "${urls[@]}"
do
  echo "Downloading ${url}..."
  curl -O "${url}"
  echo ""
done

cd ..
echo "All license data downloaded"
