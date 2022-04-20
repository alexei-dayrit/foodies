set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."posts" (
	"postId" serial,
	"imageUrl" TEXT,
	"createdAt" timestamp with time zone NOT NULL default now(),
  "editedAt" timestamp with time zone,
	"location" TEXT,
	"userId" integer,
	"isBought" BOOLEAN,
	"caption" TEXT,
	CONSTRAINT "posts_pk" PRIMARY KEY ("postId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."users" (
	"userId" serial NOT NULL,
	"username" TEXT NOT NULL UNIQUE,
	"hashedPassword" TEXT NOT NULL,
	"signedUpAt" timestamp with time zone NOT NULL default now(),
	"followerCount" integer NOT NULL,
	"followingCount" integer NOT NULL,
  "profilePhotoUrl" TEXT NOT NULL,
	"postCount" integer NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."likes" (
	"userId" integer NOT NULL,
	"postId" integer NOT NULL,
	"likedAt" timestamp with time zone NOT NULL default now()
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."comments" (
	"commentId" serial NOT NULL,
  "comment" TEXT NOT NULL,
	"userId" integer NOT NULL,
	"postId" integer NOT NULL,
	"commentedAt" timestamp with time zone NOT NULL default now(),
	CONSTRAINT "comments_pk" PRIMARY KEY ("commentId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."followers" (
	"followerId" integer NOT NULL,
	"userId" integer NOT NULL,
	"followedAt" timestamp with time zone NOT NULL default now()
) WITH (
  OIDS=FALSE
);



ALTER TABLE "posts" ADD CONSTRAINT "posts_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");


ALTER TABLE "likes" ADD CONSTRAINT "likes_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "likes" ADD CONSTRAINT "likes_fk1" FOREIGN KEY ("postId") REFERENCES "posts"("postId");

ALTER TABLE "comments" ADD CONSTRAINT "comments_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "comments" ADD CONSTRAINT "comments_fk1" FOREIGN KEY ("postId") REFERENCES "posts"("postId");

ALTER TABLE "followers" ADD CONSTRAINT "followers_fk0" FOREIGN KEY ("followerId") REFERENCES "users"("userId");
ALTER TABLE "followers" ADD CONSTRAINT "followers_fk1" FOREIGN KEY ("userId") REFERENCES "users"("userId");
