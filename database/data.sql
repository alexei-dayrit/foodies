-- DANGER: this is NOT how to do it in the real world.
-- You should NEVER EVER check user data into Git!

insert into "users" ("userId", "username", "hashedPassword", "followerCount", "followingCount", "postCount")
     values (1, 'sushi_lover', 'placeholder', 0, 0, 1);

insert into "users" ("userId", "username", "hashedPassword", "followerCount", "followingCount", "postCount")
     values (2, 'anonymous2', 'placeholder', 0, 0, 1);

insert into "posts" ("postId", "caption", "imageUrl", "location", "userId", "isBought")
     values (100, 'data-test1', 'image-1649888023634.jpeg', 'test-location1', 1, true);

insert into "posts" ("postId", "caption", "imageUrl", "location", "userId", "isBought")
     values (101, 'data-test2', 'image-1649888023634.jpeg', 'test-location2', 1, false);

insert into "posts" ("postId", "caption", "imageUrl", "location", "userId", "isBought")
     values (102, 'data-test3', 'image-1649888023634.jpeg', 'test-location3', 1, false);

insert into "posts" ("postId", "caption", "imageUrl", "location", "userId", "isBought")
     values (103, 'data-test3', 'image-1649888023634.jpeg', 'test-location4', 2, false);

-- 2022-04-12T18:44:59.581239Z
