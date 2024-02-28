[Cover Gen](https://github.com/dsoto30/cover-letter-generator)

Software Design Document

Author: Daniel Everardo Soto

**Functional Description**

During the job hunting process while dealing with job searching, resume reviews and interview prep sessions one of the tedious things to deal with is writing cover letters for a job posting . Many people have trouble creating cover letters by scratch because we need to structure the letter based on the position/company we are applying to. These postings can be different roles, skills and experience levels. Users will create/sign in through google and create/edit a profile. This profile will consist with user information, resume, and ability to connect their LinkedIn or Github accounts to provide more information. We will use the OpenAI API to generate cover letters by feeding the model their resume and any other relevant information gathered from their LinkedIn/Github profiles alongside a job posting found online or LinkedIn API.

- User to Sign In with a Google Account
- Profile section that includes file uploaded resume and connected to LinkedIn and Github accounts
- Use LinkedIn API to obtain user skills and recommended job postings (Required)
- Use Github API to obtain repos and used tools in popular repositories as supplementary information to model (Optional)
- Use OpenAI API as model to feed all relevant User information to generate a cover letter based on a User specified job posting
- Feedback section users can comment to improve model

**[User Interface](https://www.figma.com/file/91ipi1HuSW3dyYzuVMJX1A/Cover-Gen-UI-Design?type=design&node-id=0%3A1&mode=design&t=zLDrozuyqWnWcSja-1)**

**API Endpoints**

These endpoints will deal with database operations using MongoDB drivers and OAuth 2.0

**User Authentication and Profile**

- `/api/auth/google`: Endpoint for Google authentication.
- `/api/user/profile`: Endpoint to retrieve and update user profile information. (GET & PUT)
- `/api/user/resume`: Endpoint to handle resume upload and retrieval. (GET & PUT)

**LinkedIn Integration**

- `/api/linkedin/connect`: Endpoint to initiate the LinkedIn connection.
- `/api/linkedin/skills`: Endpoint to retrieve user skills from LinkedIn.
- `/api/linkedin/recommendations`: Endpoint to obtain job recommendations

**Github Integration**

- `/api/github/connect`: Endpoint to initiate the GitHub connection.
- `/api/github/repos`: Endpoint to retrieve user repositories from GitHub.

**Cover Letter Generation**

- `/api/generate/coverletter`: Endpoint to trigger the cover letter generation process.
- `/api/feedback/coverletter`: Endpoint to collect user feedback on generated cover letters.

**Tech Stack**

- MERN stack
- Postman
- Figma
- AWS
- Docker
- Google/LinkedIn/Open AI API

**Comments**

- Perhaps no need for Github OAuth 2.0 portion
