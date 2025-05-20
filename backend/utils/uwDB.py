import os
from dotenv import load_dotenv
from pymongo import MongoClient
from bson import ObjectId

# Load environment variables (if using a .env file)
load_dotenv()

# Replace with your MongoDB URI or get from .env
MONGO_URI = os.getenv('MONGODB_URI')

# Initialize Mongo client
client = MongoClient(MONGO_URI)

# Select the database and collection
db = client.users
collection = db.insured


# You can also create functions here to handle database queries
def insert_insured_data(party_id, org_name, org_type, dba, fein, tin, business_activity, sic_code, naics,
                        naics_description, years_in_business, party_status,
                        pin_code, address_line_1, address_line_2, county, city, state, country, risk_location,
                        first_name, middle_name, last_name, email_id, country_code, phone_number, website):
    data = {
        "insuredInfo": {
            "partyId": party_id,
            "orgName": org_name,
            "orgType": org_type,
            "dba": dba,
            "fein": fein,
            "tin": tin,
            "businessActivity": business_activity,
            "sicCode": sic_code,
            "naics": naics,
            "naicsDescription": naics_description,
            "yearsInBusiness": int(years_in_business),
            "partyStatus": party_status
        },
        "insuredMailingAddress": [{
            "pinCode": pin_code,
            "addressLine1": address_line_1,
            "addressLine2": address_line_2,
            "county": county,
            "city": city,
            "state": state,
            "country": country,
            "riskLocation": risk_location,
        }],
        "insuredContactPerson": {
            "partyId": party_id,
            "firstName": first_name,
            "middleName": middle_name,
            "lastName": last_name,
            "emailId": email_id,
            "countryCode": country_code,
            "phoneNumber": phone_number,
            "website": website
        }
    }
    result = collection.insert_one(data)
    return str(result.inserted_id)


def get_insured_data_by_id(submission_id):
    try:
        # Convert the provided id (string) to ObjectId
        object_id = ObjectId(submission_id)

        # Query the database for a specific document by _id
        data = collection.find_one({"_id": object_id}, {"_id": 0})

        if data:
            # Convert the ObjectId back to a string for JSON serialization
            return data
        else:
            return None  # Return None if no document is found
    except Exception as e:
        print(f"Error: {e}")
        return None  # Return None in case of invalid ID or any other error


def update_insured_data_by_id(party_id, new_data):
    try:
        # Convert the provided id (string) to ObjectId
        object_id = ObjectId(party_id)

        # Update the document with new data
        result = collection.update_one(
            {"_id": object_id},  # Filter: find the document by _id
            {"$set": new_data}  # Update: set the new data fields
        )

        # Check if the update was successful
        if result.matched_count > 0:
            return {"status": "success", "matched_count": result.matched_count, "modified_count": result.modified_count}
        else:
            return {"status": "error", "message": "Document not found"}

    except Exception as e:
        print(f"Error: {e}")
        return {"status": "error", "message": str(e)}
