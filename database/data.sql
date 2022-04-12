-- DANGER: this is NOT how to do it in the real world.
-- You should NEVER EVER check user data into Git!

insert into "users" ("userId", "username", "hashedPassword",
                    "createdAt", "followerCount", "followingCount", "postCount")
             values (1, 'anonymous1', 'placeholder',
                    null, 0, 0, 0);

insert into "users" ("userId", "username", "hashedPassword",
                    "createdAt", "followerCount", "followingCount", "postCount")
             values (2, 'anonymous2', 'placeholder',
                    null, 0, 0, 0);
