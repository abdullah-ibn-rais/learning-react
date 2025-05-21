import React, { createContext, useContext } from "react";

// ১️⃣ 👉 একটা context তৈরি করি, যার default মান 0 (মানে প্রথমে level 0)
//    এখানে context = একটা global variable, যেটা অনেক deep পর্যন্ত সবাই নিতে পারে।
const LevelContext = createContext(0);

// ২️⃣ Section কম্পোনেন্ট: যেকোনো কিছু wrap করার জন্য ব্যাবহার হবে
function Section({ children }) {
  // context থেকে এখনকার (parent) level পড়লাম
  const level = useContext(LevelContext);

  // এখন <LevelContext.Provider> দিয়ে নিচের সব children-কে
  // একটা নতুন মান পাঠাবো — মানে level+1 (এটা হেডিং-এর জন্য দরকার)
  return (
    <section>
      <LevelContext.Provider value={level + 1}>
        {children}
      </LevelContext.Provider>
    </section>
  );
}

// ৩️⃣ Heading কম্পোনেন্ট: এটা হেডিং লেভেল (h1, h2...) ঠিক করবে
function Heading({ children }) {
  // আবার context থেকে level পড়লাম
  const level = useContext(LevelContext);

  // যদি কেউ section-এর বাইরে ব্যবহার করে — Error দিবে
  if (level === 0) {
    throw Error('Heading must be inside a Section!');
  }

  // level অনুযায়ী <h1> থেকে <h6> পর্যন্ত দেখাবে (বেশি হলে error)
  switch (level) {
    case 1: return <h1>{children}</h1>;
    case 2: return <h2>{children}</h2>;
    case 3: return <h3>{children}</h3>;
    case 4: return <h4>{children}</h4>;
    case 5: return <h5>{children}</h5>;
    case 6: return <h6>{children}</h6>;
    default: throw Error('Unknown level: ' + level);
  }
}

// ৪️⃣ Post কম্পোনেন্ট: একটা post দেখানোর জন্য
function Post({ title, body }) {
  return (
    // এখানে Section কে isFancy=true পাঠানো হলো (ভিন্নভাবে দেখানোর জন্য, স্টাইল ছাড়া)
    <Section isFancy={true}>
      <Heading>{title}</Heading>
      <p><i>{body}</i></p>
    </Section>
  );
}

// ৫️⃣ RecentPosts কম্পোনেন্ট: নতুন পোস্টগুলা দেখাবে
function RecentPosts() {
  return (
    <Section>
      <Heading>Recent Posts</Heading>
      <Post
        title="Flavors of Lisbon"
        body="...those pastéis de nata!"
      />
      <Post
        title="Buenos Aires in the rhythm of tango"
        body="I loved it!"
      />
    </Section>
  );
}

// ৬️⃣ AllPosts কম্পোনেন্ট: সব পোস্টের সেকশন (তার মধ্যে recentPosts ও আছে)
function AllPosts() {
  return (
    <Section>
      <Heading>Posts</Heading>
      <RecentPosts />
    </Section>
  );
}

// ৭️⃣ ProfilePage: এইটাই পুরো app-এর কাঠামো
function ProfilePage() {
  return (
    <Section>
      <Heading>My Profile</Heading>
      <Post
        title="Hello traveller!"
        body="Read about my adventures."
      />
      <AllPosts />
    </Section>
  );
}

// ৮️⃣ App (main/root component): একদম উপরে একটা Section না থাকলে হেডিং error দিবে
export default function Test2() {
  // এখানে শুধু ProfilePage-কে render করছি
  return <ProfilePage />;
}
