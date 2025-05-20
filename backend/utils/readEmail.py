import os
import poplib
from dotenv import load_dotenv
from email.parser import Parser
from email.header import decode_header
from email.utils import parseaddr

load_dotenv()


# Function to decode email header
def decode_str(s):
    if not s:
        return ''
    value, charset = decode_header(s)[0]
    if isinstance(value, bytes):
        return value.decode(charset or 'utf-8', errors='ignore')
    return value


# Save attachment directly
def save_attachment(file_content, upload_dir, filename):
    try:
        file_path = os.path.join(upload_dir, filename)
        with open(file_path, "wb") as f:
            f.write(file_content)
        print(f"Saved attachment: {file_path}")
        return file_path
    except Exception as e:
        print(f"Error saving attachment {filename}: {e}")
        return None


def read_email_data(upload_dir):
    pop_conn = None
    try:
        pop_conn = poplib.POP3_SSL('pop.gmail.com')
        pop_conn.user(os.getenv("EMAIL"))
        pop_conn.pass_(os.getenv("APP_PASSWORD"))

        # Get messages from server
        message_count = len(pop_conn.list()[1])
        if message_count == 0:
            print("No emails found.")
            return None

        print(f"Total emails: {message_count}")
        i = 1
        # Retrieve message by ID
        resp, lines, octets = pop_conn.retr(i)
        # Concatenate lines into single message
        msg_content = b'\n'.join(lines).decode('utf-8', errors='ignore')
        # Parse message into an email object
        msg = Parser().parsestr(msg_content)
        # Extract sender
        sender = decode_str(parseaddr(msg.get('From'))[1])
        print("From:", sender)
        subject = decode_str(msg.get('Subject'))
        print("Subject:", subject)

        found_attachment = False

        for part in msg.walk():
            content_type = part.get_content_type()
            content_disposition = str(part.get("Content-Disposition", "")).lower()
            # Handle email body
            if content_type == "text/plain" and 'attachment' not in content_disposition:
                body = part.get_payload(decode=True)
                if body:
                    charset = part.get_content_charset() or 'utf-8'
                    body_content = body.decode(charset, errors='ignore')
                    # save body content to a file
                    body_file_path = os.path.join(upload_dir, "email_body.txt")
                    with open(body_file_path, "w", encoding='utf-8') as body_file:
                        body_file.write(body_content)
                    print(f"Saved email body to {body_file_path}")
                    print("Body:\n", body_content)

            # Handle attachments
            if 'attachment' in content_disposition:
                found_attachment = True
                filename = decode_str(part.get_filename())
                # Save attachment
                if filename:
                    print("Attachment:", filename)
                    file_content = part.get_payload(decode=True)
                    file_path = save_attachment(file_content, upload_dir, filename)
                    return file_path

        if not found_attachment:
            print("No attachments found in this email.")
            return None

    except Exception as e:
        print(f"An error occurred: {e}")
        return None

    finally:
        if pop_conn:
            pop_conn.quit()


# read_email_data()
