This is a backend project for a course platform, it has all the features for the content(courses,course modules, lectures, and quizzes) administration and users usage. it has tests in all use cases and some of the controllers too.

ATENTION: this shouldn't be used in production, it is not completed and not completely tested. this software was made for no comercial intentions. This is just a example of my habilities with NestJS, Vitest, TypeScript, Clean Architecture and software design.

# Use Cases

### Courses

[x] - Create a course
[x] - Edit a course
[x] - Delete a course
[x] - Find a course by id or and by slug
[ ] - Change sections order
[x] - Fetch course with all details (Sections, Lectures, Quizzes)

### Sections

[x] - Create a section
[x] - Edit a section
[x] - Delete a section
[x] - Find Sections by course Id

### Lecture

[x] - Create a Lecture
[x] - Edit a Lecture
[x] - Delete a Lecture

### Quizz

[x] - Create a quizz
[x] - Edit a quizz
[x] - Delete a quizz

### Admin

[ ] - Manage entities
[ ] - Access Reports
[ ] - Add and remove users from courses

### User

[x] - Access free courses
[ ] - Buy products(courses accesses)

#### create JWT RS256 private key

openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048

#### convert JWT RS256 private key to base64

base64 -i private_key.pem >> private_key-base64.txt

#### create JWT RS256 public key

openssl rsa -pubout -in private_key.pem -out public_key.pem

#### convert JWT RS256 public key to base64

base64 -i public_key.pem >> public_key-base64.txt

### Transform anytext to one line

awk 'NF {sub(/\r/, ""); printf "%s\\n",$0;}' FILE_NAME.EXAMPLE
