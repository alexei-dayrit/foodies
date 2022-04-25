-- DANGER: this is NOT how to do it in the real world.
-- You should NEVER EVER check user data into Git!

insert into "users" ("userId", "username", "profilePhotoUrl", "hashedPassword", "followerCount", "followingCount", "postCount")
     values (100, 'anonymous1', null, 'pass1', 0, 0, 0);

insert into "users" ("userId", "username",  "profilePhotoUrl", "hashedPassword", "followerCount", "followingCount", "postCount")
     values (101, 'anonymous2', null, 'pass2', 0, 0, 0);

insert into "posts" ("postId", "caption", "imageUrl", "location", "userId", "isBought")
     values (100, 'caption1', null, 'location1', 100, true);

insert into "posts" ("postId", "caption", "imageUrl", "location", "userId", "isBought", "createdAt")
     values (101, 'caption2', 'image-1650859980943', 'location2', 100, false, '2022-04-21 12:30:10');

insert into "posts" ("postId", "caption", "imageUrl", "location", "userId", "isBought")
     values (102, 'caption3', 'image-1649888023634.jpeg', 'location3', 101, false);

insert into "comments" ("userId", "comment", "postId")
     values (101, 'WOW', 100);

insert into "comments" ("userId", "comment", "postId")
     values (101, 'It looks amazing!', 100);

insert into "comments" ("userId", "comment", "postId")
     values (101, 'That looks so good! Where did you get this?', 101);
-- 2022-04-12T18:44:59.581239Z
