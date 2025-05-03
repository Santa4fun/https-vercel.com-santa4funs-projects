from flask import Flask, request, send_file
from fpdf import FPDF
import tempfile
import datetime

app = Flask(__name__)

class LeasePDF(FPDF):
    def header(self):
        self.set_font("Arial", "B", 14)
        self.cell(0, 10, "Residential Lease Agreement", 0, 1, "C")

    def footer(self):
        self.set_y(-15)
        self.set_font("Arial", "I", 8)
        self.cell(0, 10, f"Page {self.page_no()}", 0, 0, "C")

def create_lease_pdf(data):
    pdf = LeasePDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    today = datetime.date.today().strftime("%B %d, %Y")
    content = (
        f"Date: {today}\n\nThis Lease Agreement is made between the Landlord and the Tenant.\n\n"
        f"State: {data['state']}\nMonthly Rent: ${data['rent']}\nLease Duration: {data['duration']}\n"
        f"Pet Policy: {data['pets']}\n\nAdditional Notes:\n{data['notes']}\n\n"
        "Both parties agree to the terms and conditions listed above and will sign this document "
        "to formalize the agreement."
    )
    pdf.multi_cell(0, 10, content)
    temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".pdf")
    pdf.output(temp_file.name)
    return temp_file.name

@app.route("/generate-lease", methods=["POST"])
def generate_lease():
    data = request.json
    pdf_path = create_lease_pdf(data)
    return send_file(pdf_path, as_attachment=True, download_name="lease_agreement.pdf")

if __name__ == "__main__":
    app.run(debug=True)