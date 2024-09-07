[Cover Gen](https://github.com/dsoto30/cover-letter-generator)

Software Design Document

Author: Daniel Everardo Soto

**Functional Description**

During the job hunting process while dealing with job searching, resume reviews and interview prep sessions one of the tedious things to deal with is writing cover letters for a job posting . Many people have trouble creating cover letters by scratch because we need to structure the letter based on the position/company we are applying to. These postings can be different roles, skills and experience levels. Users will authenticate using Friebase Auth. This profile will consist with basic user information, 
 and their resume. We will use the OpenAI API to generate cover letters by feeding the model their resume and any further feature you guys can create for yourself!

- User to Sign In with email and password
- Profile section that includes file uploaded resume and email
- Use Github API to obtain repos and used tools in popular repositories as supplementary information to model (Optional)
- Use OpenAI API as model to feed all relevant User information to generate a cover letter based on a User specified job posting
- Feedback section users can comment to improve model

**[User Interface](https://www.figma.com/file/91ipi1HuSW3dyYzuVMJX1A/Cover-Gen-UI-Design?type=design&node-id=0%3A1&mode=design&t=zLDrozuyqWnWcSja-1)**

**API Endpoints**

These endpoints were developed using Firebase's Cloud Functions and Express JS

**User Authentication and Profile**

- User Authentication was done using Firebase and using React Context API
- Email and Password Auth
- Session Auth State Persistance

**Cover Letter Generation**

- `/api/generate/coverletter`: Endpoint to trigger the cover letter generation process. Done with Firebase CLoud Function and OpenAI API Node JS SDK

**Tech Stack**

- React JS
- Node JS / Express JS
- Firebase
- React Bootstrap
- Postman
- Figma
- API

