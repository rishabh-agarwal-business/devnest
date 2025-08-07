import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import { SIDEBAR_LABELS } from "@/enum";
import { SearchParams } from "@/type";
import Link from "next/link";
import React from "react";

const questions = [
  {
    _id: "q1",
    title: "How does JavaScript's event loop work?",
    description: "I'm trying to understand how the event loop works with asynchronous code. Can someone explain it simply?",
    author: {
      _id: "u1",
      name: "Alice"
    },
    tags: [
      { _id: "t1", name: "JavaScript" },
      { _id: "t2", name: "Async" }
    ],
    upvotes: 15,
    downvotes: 2,
    views: 120,
    createdAt: new Date(),
    answers: 3
  },
  {
    _id: "q2",
    title: "What is a closure in JavaScript?",
    description: "I've heard about closures but can't understand how they work. Any simple examples?",
    author: {
      _id: "u2",
      name: "Bob"
    },
    tags: [
      { _id: "t1", name: "JavaScript" },
      { _id: "t3", name: "Closures" }
    ],
    upvotes: 23,
    downvotes: 1,
    views: 89,
    createdAt: new Date(),
    answers: 5
  },
  {
    _id: "q3",
    title: "How to use React useEffect correctly?",
    description: "When should I use useEffect in React, and what should I avoid?",
    author: {
      _id: "u3",
      name: "Charlie"
    },
    tags: [
      { _id: "t4", name: "React" },
      { _id: "t5", name: "Hooks" }
    ],
    upvotes: 30,
    downvotes: 3,
    views: 200,
    createdAt: new Date(),
    answers: 2
  },
  {
    _id: "q4",
    title: "Best practices for writing CSS in large projects?",
    description: "How do you structure your CSS for large scale applications?",
    author: {
      _id: "u4",
      name: "Diana"
    },
    tags: [
      { _id: "t6", name: "CSS" },
      { _id: "t7", name: "Best Practices" }
    ],
    upvotes: 18,
    downvotes: 0,
    views: 77,
    createdAt: new Date(),
    answers: 1
  },
  {
    _id: "q5",
    title: "How to optimize performance in React apps?",
    description: "What are some techniques for improving performance in React?",
    author: {
      _id: "u1",
      name: "Alice"
    },
    tags: [
      { _id: "t4", name: "React" },
      { _id: "t8", name: "Performance" }
    ],
    upvotes: 40,
    downvotes: 4,
    views: 321,
    createdAt: new Date(),
    answers: 6
  },
  {
    _id: "q6",
    title: "What is the difference between let, const and var?",
    description: "Can someone explain the scope differences between let, const, and var in JavaScript?",
    author: {
      _id: "u5",
      name: "Ethan"
    },
    tags: [
      { _id: "t1", name: "JavaScript" },
      { _id: "t9", name: "Variables" }
    ],
    upvotes: 22,
    downvotes: 1,
    views: 145,
    createdAt: new Date(),
    answers: 4
  },
  {
    _id: "q7",
    title: "How to implement dark mode in a website?",
    description: "What are the different ways to implement a dark mode toggle?",
    author: {
      _id: "u6",
      name: "Fiona"
    },
    tags: [
      { _id: "t6", name: "CSS" },
      { _id: "t10", name: "UX" }
    ],
    upvotes: 16,
    downvotes: 2,
    views: 103,
    createdAt: new Date(),
    answers: 2
  },
  {
    _id: "q8",
    title: "What is debouncing in JavaScript?",
    description: "How does debouncing work and when should I use it?",
    author: {
      _id: "u2",
      name: "Bob"
    },
    tags: [
      { _id: "t1", name: "JavaScript" },
      { _id: "t11", name: "Debounce" }
    ],
    upvotes: 12,
    downvotes: 1,
    views: 99,
    createdAt: new Date(),
    answers: 3
  },
  {
    _id: "q9",
    title: "How to use lodash debounce with React?",
    description: "Can someone provide a working example of using lodash debounce in a React input?",
    author: {
      _id: "u7",
      name: "George"
    },
    tags: [
      { _id: "t4", name: "React" },
      { _id: "t11", name: "Debounce" },
      { _id: "t12", name: "Lodash" }
    ],
    upvotes: 25,
    downvotes: 2,
    views: 110,
    createdAt: new Date(),
    answers: 3
  },
  {
    _id: "q10",
    title: "How to use TypeScript with React?",
    description: "What are the benefits and some common patterns for using TypeScript in React?",
    author: {
      _id: "u8",
      name: "Hannah"
    },
    tags: [
      { _id: "t4", name: "React" },
      { _id: "t13", name: "TypeScript" }
    ],
    upvotes: 35,
    downvotes: 1,
    views: 210,
    createdAt: new Date(),
    answers: 7
  }
];

const Home = async ({ searchParams }: SearchParams) => {
  const { query = '' } = await searchParams;

  const filteredQuestions = questions.filter((question) =>
    question.title.toLowerCase().includes(query?.toLowerCase()));

  return (<>
    <section className="flex w-full flex-col-reverse
    justify-between gap-4 sm:flex-row sm:items-center">
      <h1 className="h1-bold text-dark100_light900">
        All Questions
      </h1>

      <Button className="primary-gradient min-h-[46px] px-4 py-3 
      !text-light-900" asChild>
        <Link href={ROUTES.ASK_QUESTION}>
          {SIDEBAR_LABELS.ASK_QUESTION}
        </Link>
      </Button>
    </section>

    <section className="mt-11">
      <LocalSearch
        route={ROUTES.HOME}
        imgSrc="/icons/search.svg"
        placeholder="Search"
        otherClasses='flex-1'
      />
    </section>
    {/* Home Filter */}

    <div className="mt-10 flex w-full flex-col gap-6">
      {
        filteredQuestions.map((question) => (
          <h1 key={question._id}>{question.title}</h1>
        ))
      }
    </div>
  </>)
};

export default Home;
