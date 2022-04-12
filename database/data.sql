-- DANGER: this is NOT how to do it in the real world.
-- You should NEVER EVER check user data into Git!

insert into "users" ("userId", "username", "hashedPassword", "followerCount", "followingCount", "postCount")
     values (1, 'anonymous1', 'placeholder', 0, 0, 1);

insert into "users" ("userId", "username", "hashedPassword", "followerCount", "followingCount", "postCount")
     values (2, 'anonymous2', 'placeholder', 0, 0, 0);

insert into "photos" ("photoId", "caption", "image-1649789113223.jpeg", "location", "userId", "isBought")
     values (10, 'test', 'test', 'test', 1, true)

-- 2022-04-12T18:44:59.581239Z
