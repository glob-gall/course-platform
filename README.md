# Use Cases

### Courses

[x] - Create a course
[x] - Edit a course
[x] - Delete a course
[x] - Find a course by id or and by slug
[ ] - Change sections order
[ ] - Fetch course with all details (Sections, Lectures, Quizzes)

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

[ ] - Create a quizz
[ ] - Edit a quizz
[ ] - Delete a quizz

### Admin

[ ] - Manage entities
[ ] - Access Reports
[ ] - Add and remove users from courses

### User

[ ] - Access free courses
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
