import React from 'react';

const LocationBuildingConfig = () => {
  const configData = {
    "locations": [
      {
        "value": "123-05 84th Avenue",
        "label": "123-05 84th Avenue, Kew Gardens, NY 11415"
      }
    ],
    "defaultFormData": {
      "yearBuilt": "",
      "squareFootage": "",
      "unitsCount": "",
      "storiesCount": "",
      "freePlacesCount": "",
      "roomsCount": "",
      "parkingSpacesCount": "",
      "protectiveDevices": "",
      "freePlacesCount2": "",
      "constructionType": "",
      "fireSprinkler": "",
      "sprinkleredArea": "",
      "roofType": "",
      "estimatedrcv": "",
      "propertyClass": "",
      "coverages": "",
      "rateType": "",
      "causeofLoss": "",
      "excludeVandalism": "",
      "excludeSprinkler": "",
      "windDeductable": "",
      "valuationMethod": "",
      "autoIncrease": "",
      "coinsurance": "",
      "buildingLimit": "",
      "buildingDeductable": "",
      "bppl": "",
      "bppd": "",
      "causeofLoss2": "",
      "excludeVandalism2": "",
      "excludeSprinkler2": "",
      "windDeductable2": "",
      "valuationMethod2": "",
      "reportingForm": "",
      "coinsurance2": "",
      "incomeLimitManufacture": "",
      "incomeLimitMfg": "",
      "incomeLimitrental": "",
      "coinsurance3": "",
      "causeofLoss3": "",
      "waitingPeriod": "",
      "periodOfCoverages": "",
      "floodCoveragelimit": "",
      "floodCoveragemonthlyLimit": "",
      "earthquakeCoveragelimit": "",
      "earthquakeCoveragemonthlylimit": "",
      "showFloodFields": false,
      "showEarthquakeFields": false
    },
    "sampleValues": {
      "yearBuilt": "1952",
      "squareFootage": "45,000",
      "unitsCount": "",
      "storiesCount": "5",
      "freePlacesCount": "",
      "roomsCount": "",
      "parkingSpacesCount": "",
      "protectiveDevices": "Alarm system, CCTV",
      "freePlacesCount2": "",
      "constructionType": "Masonry",
      "fireSprinkler": "yes",
      "sprinkleredArea": "100%",
      "roofType": "Flat roof with gravel",
      "estimatedrcv": "$15,000,000",
      "propertyClass": "Residental Building",
      "coverages": "Property damage, Fire, Liability",
      "rateType": "",
      "causeofLoss": "",
      "excludeVandalism": "",
      "excludeSprinkler": "No",
      "windDeductable": "",
      "valuationMethod": "",
      "autoIncrease": "",
      "coinsurance": "",
      "buildingLimit": "$15,000,000",
      "buildingDeductable": "$5,000",
      "bppl": "$5,00,000",
      "bppd": "",
      "causeofLoss2": "",
      "excludeVandalism2": "",
      "excludeSprinkler2": "",
      "windDeductable2": "",
      "valuationMethod2": "",
      "reportingForm": "",
      "coinsurance2": "",
      "incomeLimitManufacture": "",
      "incomeLimitMfg": "",
      "incomeLimitrental": "",
      "coinsurance3": "",
      "causeofLoss3": "",
      "waitingPeriod": "",
      "periodOfCoverages": "",
      "floodCoveragelimit": "$5,00,000",
      "floodCoveragemonthlyLimit": "$25,000",
      "earthquakeCoveragelimit": "$10,00,000",
      "earthquakeCoveragemonthlylimit": "$50,000",
      "showFloodFields": false,
      "showEarthquakeFields": false
    },
    "deleteFormData": {
      "yearBuilt": "2001",
      "squareFootage": "12000sq ft",
      "unitsCount": "25",
      "storiesCount": "7",
      "freePlacesCount": "2",
      "roomsCount": "10",
      "parkingSpacesCount": "10",
      "protectiveDevices": "yes",
      "freePlacesCount2": "2",
      "constructionType": "commercial",
      "fireSprinkler": "yes",
      "sprinkleredArea": "5000sq ft",
      "roofType": "",
      "estimatedrcv": "",
      "propertyClass": "",
      "coverages": "",
      "rateType": "",
      "causeofLoss": "",
      "excludeVandalism": "",
      "excludeSprinkler": "",
      "windDeductable": "",
      "valuationMethod": "",
      "autoIncrease": "",
      "coinsurance": "",
      "buildingLimit": "",
      "buildingDeductable": "",
      "bppl": "",
      "bppd": "",
      "causeofLoss2": "",
      "excludeVandalism2": "",
      "excludeSprinkler2": "",
      "windDeductable2": "",
      "valuationMethod2": "",
      "reportingForm": "",
      "coinsurance2": "",
      "incomeLimitManufacture": "",
      "incomeLimitMfg": "",
      "incomeLimitrental": "",
      "coinsurance3": "",
      "causeofLoss3": "",
      "waitingPeriod": "",
      "periodOfCoverages": "",
      "floodCoveragelimit": "",
      "floodCoveragemonthlyLimit": "",
      "earthquakeCoveragelimit": "",
      "earthquakeCoveragemonthlylimit": "",
      "showFloodFields": false,
      "showEarthquakeFields": false
    },
    "tableDefaults": {
      "yearBuilt": 1952,
      "squareFootage": 45000,
      "roofType": "Flat Roof with Gravel"
    },
    "ui": {
      "tabs": {
        "tab1": {
          "id": "Tab1",
          "label": "Building Info",
          "title": "Building Management"
        },
        "tab2": {
          "id": "Tab2",
          "label": "Other Insights"
        }
      },
      "sections": {
        "propertyDetails": {
          "title": "Property Details",
          "icon": "homeicon"
        },
        "propertyDamage": {
          "title": "Property Damage Coverage",
          "icon": "propertyicon"
        },
        "businessProperty": {
          "title": "Business Personal Property",
          "icon": "businessicon"
        },
        "businessIncome": {
          "title": "Business Income Coverage",
          "icon": "mailAdd"
        },
        "additionalInfo": {
          "title": "Additional Information",
          "icon": "addDetails"
        }
      },
      "selectWidth": 220,
      "selectHeight": 45,
      "tablePageSize": 5
    },
    "fieldLabels": {
      "yearBuilt": "Year Built",
      "squareFootage": "Square Footage",
      "unitsCount": "Units Count",
      "storiesCount": "Stories Count",
      "freePlacesCount": "FreePlacesCount",
      "roomsCount": "Rooms Count",
      "parkingSpacesCount": "Parking Spaces Count",
      "protectiveDevices": "Protective devices",
      "constructionType": "Construction Type",
      "fireSprinkler": "Fire Sprinkler",
      "sprinkleredArea": "Sprinklered area",
      "roofType": "Roof type",
      "estimatedrcv": "Estimated replacement cost value",
      "propertyClass": "Property class",
      "coverages": "Coverages",
      "rateType": "Rate Type",
      "excludeVandalism": "Exclude Vandalism",
      "excludeSprinkler": "Exclude sprinkler",
      "windDeductable": "Wind % deductable",
      "valuationMethod": "Valuation Method",
      "autoIncrease": "Auto increase %",
      "coinsurance": "Coinsurance",
      "buildingLimit": "Building Limit",
      "buildingDeductable": "Building Deductible",
      "bppl": "Business Personal Property Limit",
      "bppd": "Business Personal Property Deductable",
      "excludeVandalism2": "Exclude Vandalism",
      "excludeSprinkler2": "Exclude Sprinkler",
      "windDeductable2": "Wind % deductable",
      "valuationMethod2": "Valuation Method",
      "reportingForm": "Reporting form",
      "coinsurance2": "Coinsurance",
      "incomeLimitrental": "Income Limit $",
      "coinsurance3": "Coinsurance",
      "waitingPeriod": "Waiting Period",
      "periodOfCoverages": "Period of coverages",
      "floodCoveragelimit": "Flood Coverage Limit",
      "floodCoveragemonthlyLimit": "Flood Coverage Deductable",
      "earthquakeCoveragelimit": "Earthquake Coverage Limit",
      "earthquakeCoveragemonthlylimit": "Earthquake Coverage Deductable"
    },
    "checkboxLabels": {
      "showFloodFields": "Flood Coverage",
      "showEarthquakeFields": "Earthquake Coverage"
    },
    "buttonLabels": {
      "addBuilding": "Add Building",
      "editBuilding": "OK",
      "next": "Next ",
      "delete": "Delete"
    }
  };

  return configData;
};

// Export both the component and the config data
export const useLocationBuildingConfig = () => {
  return LocationBuildingConfig();
};

export default LocationBuildingConfig;