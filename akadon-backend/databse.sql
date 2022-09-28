create database AkadonDatabase
go
use AkadonDatabase
go
create table Admin(
	adminId int identity primary key,
	email nvarchar(100) unique,
	password char(64) ,
	fullname nvarchar(100) ,
	gender bit ,
	city nvarchar(100) ,
	district nvarchar(100) ,
	ward nvarchar(100) ,
	phonenumber char(11) unique ,
	birthday datetime ,
	role nvarchar(20),
	status bit,
	image nvarchar(200) ,
	verificationCode char(64),
	otpRequestTime datetime,
)

create table ServicePackage(
	servicePackageId int identity primary key,
	servicePackageName nvarchar(100)  unique,
	maxStudents int,
	maxRequest int,
	pricePerMonth money,
)
create table Tutor(
	tutorId int identity primary key,
	email nvarchar(100) unique ,
	password char(64) ,
	fullname nvarchar(100) ,
	gender bit ,
	city nvarchar(100) ,
	district nvarchar(100) ,
	ward nvarchar(100) ,
	phonenumber char(11) unique ,
	birthday datetime ,
	image nvarchar(100),
	servicePackageId int foreign key references ServicePackage(servicePackageId),
	rating int,
	role nvarchar(20),
	behaviorPoint int ,
	status bit,
	verificationCode char(64),
	taughtStudentNumber int,
	taughtCourseNumber int,
	otpRequestTime datetime,
	lastLogin datetime,
)

create table Student(
	studentId int identity primary key,
	email nvarchar(100) unique ,
	password char(64) ,
	fullname nvarchar(100) ,
	gender bit ,
	city nvarchar(100) ,
	district nvarchar(100) ,
	ward nvarchar(100) ,
	phonenumber char(11),
	birthday datetime ,
	image nvarchar(100) ,
	rating int,
	role nvarchar(20),
	behaviorPoint int,
	status bit,
	learntCourseNumber int,
	verificationCode char(64),
	otpRequestTime datetime,
	lastLogin datetime,
)

create table Subject(
	subjectId int identity primary key,
	subjectName nvarchar(100)  unique,
	subjectImage nvarchar(100) unique,
)

create table Level(
	levelId int identity primary key,
	levelName nvarchar(100)  unique,
)

create table TutorDetail(
	tutorDetailId int primary key identity,
	tutorId int foreign key references Tutor(tutorId),
	subjectId int foreign key references Subject(subjectId),
	levelId int foreign key references Level(levelId),
)


create table VerifycateImage(
	verifycateImageId int primary key identity,
	tutorId int foreign key references Tutor(tutorId),
	verifycateType nvarchar(100),
	verifyImage nvarchar(100),
	verifyValue nvarchar(50),
	verifyYear nvarchar(4),
)

create table StudentRequest(
	studentRequestId int identity primary key,
	studentRequestTitle nvarchar(300) ,
	studentId int foreign key references Student(studentId),
	subjectId int foreign key references Subject(subjectId),
	levelId int foreign key references Level(levelId),
	costPerHour money ,
	durationPerSession float,
	beginTime BIGINT ,
	endTime BIGINT ,
	learningDate nvarchar(500),
	introduction nvarchar(100),
	studentWishes nvarchar(500) ,
	testLearning bit default 0,
	learningMethod bit default 0,
	createdDate datetime, 
	endDate datetime,
	quantityTutorRequest int,
	payDate int,
	payTime int,
	status nvarchar(50),
)

create table TutorRequest(
	tutorRequestId int identity primary key,
	tutorId int foreign key references Tutor(tutorId),
	studentRequestId int foreign key references StudentRequest(studentRequestId),
	receiveDate datetime,
	requestType nvarchar(50),
	testDate bigint,
	status nvarchar(30),
)


create table Course( 
	courseId int identity primary key,
	courseName nvarchar(100),
	studentRequestId int foreign key references StudentRequest(studentRequestId),
	tutorRequestId int foreign key references TutorRequest(tutorRequestId),
	startDate datetime,
	startTime BIGINT,
	endTime BIGINT,
	endDate datetime,
	studyDate nvarchar(200),
	status nvarchar(50),
	createdDate datetime,
	paymentStatus bit,
)

create table CourseDetail(
	courseDetailId int identity primary key,
	courseId int foreign key references Course(courseId),
	activeDate datetime ,
	studentComment nvarchar(200),
	tutorComment nvarchar(200),
	studentRate int,
	teacherRate int,
	payRequest bit,
	tutorPay bit,
	status bit
)

create table Schedule(
	Id int primary key identity,
	Subject nvarchar(100) ,
	StartTime BIGINT ,
	EndTime BIGINT ,
	tutorId int foreign key references Tutor(tutorId),
	studentId int foreign key references Student(StudentId) 
)



create table UserQuestion(
	userQuestionId int identity primary key,
	fullName nvarchar(100) ,
	phoneNumber char(11) ,
	sendEmail nvarchar(150) ,
	content nvarchar(200) ,
	askDate datetime ,
	seen bit,
)

create table Review(
	commentId int identity primary key,
	sendCommentEmail nvarchar(100) ,
	receiveCommentEmail nvarchar(100) ,
	comment nvarchar(100) ,
	rating int ,
	sendName nvarchar(100),
	receiveName nvarchar(100),
	commentDate datetime ,
)

create table Bank(
	bankId int primary key identity,
	bankName nvarchar(200)  unique,
	bankAbbreviations nvarchar(20)  unique,
	bankLogo nvarchar(100)  unique,
)

create table TutorBankInfo(
	tutorBankId int primary key identity,
	tutorId int foreign key references Tutor(tutorId),
	bankId int foreign key references Bank(bankId),
	accountNumber char(14)  unique,
	surplus money ,
	defaultBank bit,
)

create table StudentBankInfo(
	studentBankId int primary key identity,
	studentId int foreign key references Student(studentId),
	bankId int foreign key references Bank(bankId),
	accountNumber char(14)  unique,
	surplus money ,
	defaultBank bit,
)
create table Transactions(
	transactionId int primary key identity,
	sentEmail nvarchar(30),
	receiveEmail nvarchar(30),
	sentMoney money ,
	sendName nvarchar(100),
	receiveName nvarchar(100),
	content nvarchar(200) ,
	dateTransaction datetime,
)

create table Notifications(
	notificationId int primary key identity,
	accountEmail nvarchar(100) ,
	title nvarchar(100),
	content nvarchar(200),
	notificationTime datetime ,
	link nvarchar(100),
	seen bit default 0,
)
