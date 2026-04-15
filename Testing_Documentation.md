# Software Testing Documentation

## 1. Unit Testing: Login Module

### Test Case 1.1: Successful Admin Login
* **Description:** Verifies that an admin user with the correct email, password, and role can successfully log in.
* **Pre-conditions:** A hashed password and dummy Admin user must be configured in the test database setup.
* **Test Steps:**
  1. Send a POST request to `/auth/login` with payload `{ email, password, role: "admin" }`.
* **Expected Result:**
  * HTTP Status: `200 OK`.
  * Response body returns `ok: true`.

### Test Case 1.2: Reject Login with Wrong Password
* **Description:** Verifies that the API securely rejects login attempts where the account exists but the user provides an incorrect password.
* **Pre-conditions:** An Admin user account exists with a known valid password.
* **Test Steps:**
  1. Send a POST request to `/auth/login` with payload `{ email, password: "wrongPassword", role: "admin" }`.
* **Expected Result:**
  * HTTP Status: `401 Unauthorized`.
  * Response body returns `ok: false`.

### Test Case 1.3: Reject Login for User Not Found
* **Description:** Verifies that the API rejects login attempts for an email address that does not exist in the database.
* **Pre-conditions:** The specified email does not map to any existing user record.
* **Test Steps:**
  1. Send a POST request to `/auth/login` with payload `{ email: "nouser@test.com", password: "123456", role: "doctor" }`.
* **Expected Result:**
  * HTTP Status: `401 Unauthorized`.
  * Response body returns `ok: false`.

### Test Case 1.4: Reject Login with Invalid Role
* **Description:** Verifies that providing an invalid or non-existent role (e.g., "manager") during login correctly denies access even if the other credentials might somehow bypass standard checks.
* **Pre-conditions:** Provide credentials configured with an unsupported role.
* **Test Steps:**
  1. Send a POST request to `/auth/login` with payload `{ email, password, role: "manager" }`.
* **Expected Result:**
  * HTTP Status: `401 Unauthorized`.
  * Response body returns `ok: false`.

### Test Case 1.5: Error Handling for Missing Fields
* **Description:** Verifies robust error handling on the server when required fields (like email or password) are empty.
* **Pre-conditions:** No distinct prior state needed.
* **Test Steps:**
  1. Send a POST request to `/auth/login` with payload `{ email: "", password: "", role: "admin" }`.
* **Expected Result:**
  * HTTP Status: `400 Bad Request`.
  * Response body returns `ok: false`.---

## 2. Integration Testing: Appointment Booking Module

This section verifies the interaction between the application controllers, routes, and the underlying database. The tests span across different components (Patient, Doctor, Camp, and Appointment modules) to ensure comprehensive database integration.

### Test Case 2.1: Successfully Book a Camp Appointment
* **Description:** Verifies that a patient can successfully register for a scheduled camp.
* **Pre-conditions:** A valid Patient, Doctor, and Camp record must exist in the database.
* **Test Steps:**
  1. Send a POST request to `/patient/camps/:campId/patient/:patientId`.
* **Expected Result:**
  * HTTP Status: `200 OK`.
  * Response body returns `ok: true` and message `"Registred Successfully"`.
  * A new Appointment record is created in the database mapping the patient to the camp and its assigned doctor.

### Test Case 2.2: Prevent Duplicate Camp Appointments
* **Description:** Ensures that a patient cannot book the same camp appointment multiple times.
* **Pre-conditions:** The patient has already booked the specified camp.
* **Test Steps:**
  1. Send a secondary POST request to `/patient/camps/:campId/patient/:patientId`.
* **Expected Result:**
  * HTTP Status: `200 OK`.
  * Response body returns `ok: false`, preventing duplicate database entries.

### Test Case 2.3: Book Appointment Directly Using Doctor ID
* **Description:** Verifies that a patient can book a direct appointment with a specific doctor without a camp.
* **Pre-conditions:** A valid doctor and patient exist in the database.
* **Test Steps:**
  1. Send a POST request to `/patient/book-appontment` with a JSON payload containing `patientId`, `doctor` (doctor ID), `age`, `gender`, `appointmentDate`, and `appointmentTime`.
* **Expected Result:**
  * HTTP Status: `200 OK`.
  * Response body returns `ok: true` and message `"Appointment booked successfully!"`.
  * An Appointment record is generated in the database accurately reflecting the payload parameters.

### Test Case 2.4: Book Appointment Using Camp ID
* **Description:** Verifies booking an appointment by providing a Camp reference through the general booking form endpoint.
* **Pre-conditions:** A valid patient and camp exist in the database.
* **Test Steps:**
  1. Send a POST request to `/patient/book-appontment` with a JSON payload containing `patientId`, `camp` (camp ID), `age`, `gender`, `appointmentDate`, and `appointmentTime`.
* **Expected Result:**
  * HTTP Status: `200 OK`.
  * Response body returns `ok: true`.
  * The database creates an Appointment record associating the patient with the designated camp.

### Test Case 2.5: Fail Booking Without Doctor or Camp Reference
* **Description:** Validates the system's error handling when attempting to book an appointment without specifying either a target Doctor or Camp.
* **Pre-conditions:** A valid patient exists.
* **Test Steps:**
  1. Send a POST request to `/patient/book-appontment` with a partial payload (missing both `doctor` and `camp` identifiers).
* **Expected Result:**
  * HTTP Status: `400 Bad Request`.
  * Response body returns `ok: false`.
  * No new records are generated in the database.
