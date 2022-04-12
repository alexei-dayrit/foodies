set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."photos" (
	"photoId" serial NOT NULL,
	"fileUrl" TEXT NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"location" TEXT,
	"userId" integer NOT NULL,
	"cooked" BOOLEAN NOT NULL,
	CONSTRAINT "photos_pk" PRIMARY KEY ("photoId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."users" (
	"userId" serial NOT NULL,
	"username" TEXT NOT NULL UNIQUE,
	"hashedPassword" TEXT NOT NULL,
	"createdAt" timestamp with time zone,
	"followerCount" integer NOT NULL,
	"followingCount" integer NOT NULL,
	"postCount" integer NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."likes" (
	"userId" integer NOT NULL,
	"photoId" integer NOT NULL,
	"createdAt" timestamp with time zone NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."comments" (
	"commentId" serial NOT NULL,
	"userId" integer NOT NULL,
	"photoId" integer NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	CONSTRAINT "comments_pk" PRIMARY KEY ("commentId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."followers" (
	"followerId" integer NOT NULL,
	"userId" integer NOT NULL,
	"followedAt" timestamp with time zone NOT NULL
) WITH (
  OIDS=FALSE
);



ALTER TABLE "photos" ADD CONSTRAINT "photos_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");


ALTER TABLE "likes" ADD CONSTRAINT "likes_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "likes" ADD CONSTRAINT "likes_fk1" FOREIGN KEY ("photoId") REFERENCES "photos"("photoId");

ALTER TABLE "comments" ADD CONSTRAINT "comments_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "comments" ADD CONSTRAINT "comments_fk1" FOREIGN KEY ("photoId") REFERENCES "photos"("photoId");

ALTER TABLE "followers" ADD CONSTRAINT "followers_fk0" FOREIGN KEY ("followerId") REFERENCES "users"("userId");
ALTER TABLE "followers" ADD CONSTRAINT "followers_fk1" FOREIGN KEY ("userId") REFERENCES "users"("userId");
