```markdown
# Cover Gen

## Software Design Document

**Author:** Daniel Everardo Soto

### Functional Description

During the job hunting process, one of the tedious tasks is writing cover letters tailored to specific job postings. Many individuals struggle with crafting cover letters from scratch as they need to be customized based on the position and company being applied to. These postings vary in roles, required skills, and experience levels. The goal of Cover Gen is to streamline this process by utilizing user-provided information, such as resumes and LinkedIn/Github profiles, alongside job postings found online or through the LinkedIn API, to generate personalized cover letters using the OpenAI API.

**Key Features:**

- User authentication via Google account.
- Profile creation/editing, including resume upload and connection to LinkedIn/Github accounts.
- Utilization of LinkedIn API to retrieve user skills and recommended job postings (Required).
- Optional integration with the GitHub API to gather information on user repositories and tools used.
- Generation of cover letters based on user-provided information and specified job postings using the OpenAI API.
- Feedback section for users to comment and improve the generated cover letters.

### User Interface

[Describe the user interface here.]

### API Endpoints

These endpoints handle database operations using MongoDB drivers and OAuth 2.0 for authentication.

1. **User Authentication and Profile**
   - `/api/auth/google`: Endpoint for Google authentication.
   - `/api/user/profile`: Endpoint to retrieve and update user profile information. (GET & PUT)
   - `/api/user/resume`: Endpoint to handle resume upload and retrieval. (GET & PUT)

2. **LinkedIn Integration**
   - `/api/linkedin/connect`: Endpoint to initiate the LinkedIn connection.
   - `/api/linkedin/skills`: Endpoint to retrieve user skills from LinkedIn.
   - `/api/linkedin/recommendations`: Endpoint to obtain job recommendations.

3. **GitHub Integration**
   - `/api/github/connect`: Endpoint to initiate the GitHub connection.
   - `/api/github/repos`: Endpoint to retrieve user repositories from GitHub.

4. **Cover Letter Generation**
   - `/api/generate/coverletter`: Endpoint to trigger the cover letter generation process.
   - `/api/feedback/coverletter`: Endpoint to collect user feedback on generated cover letters.

### Tech Stack

- MERN stack (MongoDB, Express.js, React, Node.js)
- Postman (for API testing)
- Figma (for UI/UX design)
- AWS (for hosting)
- Docker (for containerization)
- Google/LinkedIn/OpenAI APIs

### Comments

- Consider omitting the GitHub OAuth 2.0 portion if not necessary.
```
