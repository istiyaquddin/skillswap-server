const dns = require("dns");
try {
  dns.setDefaultResultOrder("ipv4first");
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (e) {}

const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

async function seed() {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  console.log("Connected to MongoDB Atlas.");

  const db = client.db(process.env.DB_NAME || "freelance_auth_db");

  const usersCol = db.collection("user");
  const tasksCol = db.collection("tasks");
  const paymentCol = db.collection("payment");

  // Clear existing tasks and payments for a clean realistic state
  await tasksCol.deleteMany({});
  await paymentCol.deleteMany({});
  console.log("Cleared existing tasks and payments.");

  // Check demo users and update/insert complete rich profiles
  const demoUsers = [
    {
      email: "admin@demo.com",
      name: "Alex Sterling",
      role: "admin",
      title: "Chief Systems Administrator",
      bio: "Head of Platform Moderation and System Operations at SkillSwap. Overseeing market compliance, security, and global revenue ledgers.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
      status: "Active",
      createdAt: new Date("2024-01-15T08:00:00Z"),
      updatedAt: new Date(),
    },
    {
      email: "client@demo.com",
      name: "Sarah Jenkins",
      role: "client",
      company: "TechPulse Innovations",
      bio: "VP of Product at TechPulse Innovations. We specialize in building next-gen web apps, SaaS platforms, and enterprise solutions.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
      status: "Active",
      createdAt: new Date("2024-02-01T09:30:00Z"),
      updatedAt: new Date(),
    },
    {
      email: "freelancer@demo.com",
      name: "David Chen",
      role: "freelancer",
      title: "Senior Full-Stack & Next.js Specialist",
      bio: "Full-stack engineer with 7+ years of experience specializing in React, Next.js, Node.js, and modern UI systems. Passionate about sleek design and clean code.",
      hourlyRate: 65,
      skills: "React,Next.js,Node.js,Tailwind CSS,TypeScript,MongoDB,UI/UX Design",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
      status: "Active",
      createdAt: new Date("2024-02-10T11:15:00Z"),
      updatedAt: new Date(),
    },
    {
      email: "elena.design@creative.io",
      name: "Elena Rostova",
      role: "freelancer",
      title: "Lead UI/UX & Brand Designer",
      bio: "Visual designer crafting iconic digital products, mobile interfaces, and brand systems for venture-backed tech startups.",
      hourlyRate: 75,
      skills: "Figma,UI/UX Design,Brand Identity,Graphic Design,Prototyping",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
      status: "Active",
      createdAt: new Date("2024-03-01T14:00:00Z"),
      updatedAt: new Date(),
    },
    {
      email: "marcus.content@wordsmith.com",
      name: "Marcus Vance",
      role: "freelancer",
      title: "Technical Writer & SEO Content Lead",
      bio: "Crafting high-converting technical copy, SaaS documentation, and SEO blog posts that drive customer acquisition.",
      hourlyRate: 45,
      skills: "Content Writing,Copywriting,SEO Strategy,Technical Writing,Blogging",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
      status: "Active",
      createdAt: new Date("2024-03-05T10:00:00Z"),
      updatedAt: new Date(),
    },
    {
      email: "lisa.marketing@growth.io",
      name: "Lisa Thorne",
      role: "freelancer",
      title: "Performance Marketer & Growth Strategist",
      bio: "Growth strategist specialized in Google Ads, Meta PPC campaigns, and conversion rate optimization for e-commerce and SaaS.",
      hourlyRate: 60,
      skills: "Digital Marketing,Google Ads,Meta PPC,SEO,Growth Hacking",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400",
      status: "Active",
      createdAt: new Date("2024-03-12T16:00:00Z"),
      updatedAt: new Date(),
    },
  ];

  for (const u of demoUsers) {
    await usersCol.updateOne(
      { email: u.email },
      { $set: u },
      { upsert: true }
    );
  }
  console.log("Updated demo users in database.");

  // Get user references for clientId / email mapping
  const clientUser = await usersCol.findOne({ email: "client@demo.com" });
  const client2User = await usersCol.findOne({ email: "istiyaqdev@gmail.com" });
  const clientId1 = clientUser ? clientUser._id.toString() : "client123";
  const clientId2 = client2User ? client2User._id.toString() : "client456";

  const propId1 = new ObjectId();
  const propId2 = new ObjectId();
  const propId3 = new ObjectId();
  const propId4 = new ObjectId();
  const propId5 = new ObjectId();
  const propId6 = new ObjectId();
  const propId7 = new ObjectId();
  const propId8 = new ObjectId();
  const propId9 = new ObjectId();
  const propId10 = new ObjectId();

  const task1Id = new ObjectId();
  const task2Id = new ObjectId();
  const task3Id = new ObjectId();
  const task4Id = new ObjectId();
  const task5Id = new ObjectId();
  const task6Id = new ObjectId();
  const task7Id = new ObjectId();
  const task8Id = new ObjectId();

  const tasksData = [
    {
      _id: task1Id,
      title: "SaaS Dashboard Redesign & Glassmorphism Theme",
      description: "We are seeking a senior UI/UX designer and Next.js developer to modernize our SaaS analytics dashboard. Need dynamic responsive components, dark glassmorphism styling, clean data visualizations with Recharts, and mobile responsive controls.",
      budget: 1800,
      category: "Design",
      deadline: "2026-09-15",
      status: "Accepted",
      clientId: clientId1,
      client_email: "client@demo.com",
      createdAt: new Date("2026-07-01T10:00:00Z"),
      proposals: [
        {
          proposalId: propId1,
          freelancerEmail: "freelancer@demo.com",
          proposedBudget: 1750,
          estimatedDays: 7,
          coverNote: "I have built multiple glassmorphism SaaS dashboards using Next.js, Tailwind CSS, and Recharts. Ready to start immediately with high quality code.",
          status: "Accepted",
          createdAt: new Date("2026-07-02T12:00:00Z"),
        },
        {
          proposalId: propId2,
          freelancerEmail: "elena.design@creative.io",
          proposedBudget: 1800,
          estimatedDays: 10,
          coverNote: "Figma design prototype plus clean React code handover. Check my portfolio for recent dark mode dashboard designs.",
          status: "Rejected",
          createdAt: new Date("2026-07-02T14:30:00Z"),
        },
      ],
    },
    {
      _id: task2Id,
      title: "Stripe Escrow Integration & Backend Webhooks",
      description: "Implement Stripe Checkout and Webhooks in an Express backend. Must handle payment session confirmation, database status synchronization, and error handling for failed transactions.",
      budget: 1200,
      category: "Development",
      deadline: "2026-09-20",
      status: "Completed",
      deliverableUrl: "https://github.com/skillswap/stripe-escrow-module",
      completedAt: new Date("2026-07-28T16:00:00Z"),
      clientId: clientId1,
      client_email: "client@demo.com",
      createdAt: new Date("2026-07-05T09:00:00Z"),
      proposals: [
        {
          proposalId: propId3,
          freelancerEmail: "freelancer@demo.com",
          proposedBudget: 1200,
          estimatedDays: 5,
          coverNote: "Stripe certified integration engineer. I will write clean Node.js webhook handlers and full test cases for escrow checkout.",
          status: "Accepted",
          createdAt: new Date("2026-07-06T11:00:00Z"),
        },
      ],
    },
    {
      _id: task3Id,
      title: "Technical Documentation & API Endpoint Guide",
      description: "Create comprehensive REST API documentation for our developer portal. Includes OpenAPI / Swagger definitions, authentication headers guide, and code snippets in JavaScript, Python, and Curl.",
      budget: 650,
      category: "Writing",
      deadline: "2026-08-30",
      status: "open",
      clientId: clientId1,
      client_email: "client@demo.com",
      createdAt: new Date("2026-07-15T14:00:00Z"),
      proposals: [
        {
          proposalId: propId4,
          freelancerEmail: "marcus.content@wordsmith.com",
          proposedBudget: 600,
          estimatedDays: 4,
          coverNote: "Experienced technical writer with deep background in OpenAPI 3.0 and Developer Experience (DX) documentation.",
          status: "Pending",
          createdAt: new Date("2026-07-16T09:00:00Z"),
        },
        {
          proposalId: propId5,
          freelancerEmail: "freelancer@demo.com",
          proposedBudget: 650,
          estimatedDays: 3,
          coverNote: "I can deliver clear markdown API documentation with practical request/response payloads.",
          status: "Pending",
          createdAt: new Date("2026-07-17T15:00:00Z"),
        },
      ],
    },
    {
      _id: task4Id,
      title: "Full-Funnel Growth Marketing & Google Ads Setup",
      description: "Setup search and display ad campaigns on Google Ads and Meta for our B2B SaaS platform. Target tech founders and CTOs with custom landing page copy and retargeting pixel configuration.",
      budget: 1500,
      category: "Marketing",
      deadline: "2026-10-01",
      status: "open",
      clientId: clientId1,
      client_email: "client@demo.com",
      createdAt: new Date("2026-07-20T11:00:00Z"),
      proposals: [
        {
          proposalId: propId6,
          freelancerEmail: "lisa.marketing@growth.io",
          proposedBudget: 1450,
          estimatedDays: 14,
          coverNote: "Certified Google Ads Partner with $2M+ managed spend. I will double your conversion efficiency within 30 days.",
          status: "Pending",
          createdAt: new Date("2026-07-21T10:00:00Z"),
        },
      ],
    },
    {
      _id: task5Id,
      title: "Mobile App Figma Prototype for iOS & Android",
      description: "Design 25+ high-fidelity mobile app screens for a micro-task marketplace platform. Needs modern dark theme, animated prototype transitions, and complete component design system.",
      budget: 2200,
      category: "Design",
      deadline: "2026-09-25",
      status: "Accepted",
      clientId: clientId1,
      client_email: "client@demo.com",
      createdAt: new Date("2026-07-22T08:30:00Z"),
      proposals: [
        {
          proposalId: propId7,
          freelancerEmail: "elena.design@creative.io",
          proposedBudget: 2100,
          estimatedDays: 12,
          coverNote: "Specialize in mobile app design systems on Figma. Will provide interactive prototypes and developer handoff files.",
          status: "Accepted",
          createdAt: new Date("2026-07-23T11:20:00Z"),
        },
      ],
    },
    {
      _id: task6Id,
      title: "GraphQL Gateway & Microservice Performance Audit",
      description: "Optimize server performance for high traffic. Resolve database bottleneck issues, optimize MongoDB aggregation pipelines, and implement Redis caching.",
      budget: 3000,
      category: "Development",
      deadline: "2026-10-15",
      status: "Completed",
      deliverableUrl: "https://github.com/skillswap/graphql-cache-benchmark",
      completedAt: new Date("2026-08-01T12:00:00Z"),
      clientId: clientId1,
      client_email: "client@demo.com",
      createdAt: new Date("2026-07-10T15:00:00Z"),
      proposals: [
        {
          proposalId: propId8,
          freelancerEmail: "freelancer@demo.com",
          proposedBudget: 3000,
          estimatedDays: 8,
          coverNote: "Senior backend engineer with expertise in MongoDB aggregation indexing, Node.js cluster performance tuning, and microservices.",
          status: "Accepted",
          createdAt: new Date("2026-07-11T16:00:00Z"),
        },
      ],
    },
    {
      _id: task7Id,
      title: "Brand Strategy & Executive Pitch Deck Design",
      description: "Create a 15-slide investor pitch deck for series A fundraising. Needs custom vector illustrations, typography hierarchy, and financial charts presentation.",
      budget: 950,
      category: "Design",
      deadline: "2026-08-28",
      status: "open",
      clientId: clientId2,
      client_email: "istiyaqdev@gmail.com",
      createdAt: new Date("2026-07-25T13:00:00Z"),
      proposals: [
        {
          proposalId: propId9,
          freelancerEmail: "elena.design@creative.io",
          proposedBudget: 900,
          estimatedDays: 5,
          coverNote: "I have designed pitch decks that helped tech startups raise over $15M in venture funding.",
          status: "Pending",
          createdAt: new Date("2026-07-26T10:00:00Z"),
        },
      ],
    },
    {
      _id: task8Id,
      title: "SEO Blog Content Series - Cloud Infrastructure",
      description: "Write five 1500-word SEO optimized articles focusing on Serverless, Docker Containerization, Kubernetes Orchestration, and DevOps best practices.",
      budget: 800,
      category: "Writing",
      deadline: "2026-09-10",
      status: "open",
      clientId: clientId1,
      client_email: "client@demo.com",
      createdAt: new Date("2026-07-28T09:30:00Z"),
      proposals: [
        {
          proposalId: propId10,
          freelancerEmail: "marcus.content@wordsmith.com",
          proposedBudget: 800,
          estimatedDays: 6,
          coverNote: "DevOps & Cloud architecture content specialist. Articles will feature code examples and diagrams.",
          status: "Pending",
          createdAt: new Date("2026-07-29T14:00:00Z"),
        },
      ],
    },
  ];

  await tasksCol.insertMany(tasksData);
  console.log(`Inserted ${tasksData.length} tasks with rich proposals.`);

  // Insert payment transaction records linking payments, clients, and freelancers
  const paymentsData = [
    {
      sessionId: "cs_test_a1b2c3d4e5f6_saas_dashboard",
      userEmail: "client@demo.com",
      userId: clientId1,
      priceId: "price_1NxSaasDash1800",
      taskId: task1Id,
      proposalId: propId1,
      createdAt: new Date("2026-07-02T13:00:00Z"),
    },
    {
      sessionId: "cs_test_f6e5d4c3b2a1_stripe_escrow",
      userEmail: "client@demo.com",
      userId: clientId1,
      priceId: "price_1NxStripeEscrow1200",
      taskId: task2Id,
      proposalId: propId3,
      createdAt: new Date("2026-07-06T12:00:00Z"),
    },
    {
      sessionId: "cs_test_m9n8b7v6c5_mobile_prototype",
      userEmail: "client@demo.com",
      userId: clientId1,
      priceId: "price_1NxMobileProto2100",
      taskId: task5Id,
      proposalId: propId7,
      createdAt: new Date("2026-07-23T12:30:00Z"),
    },
    {
      sessionId: "cs_test_x9y8z7w6v5_graphql_audit",
      userEmail: "client@demo.com",
      userId: clientId1,
      priceId: "price_1NxGraphQLAudit3000",
      taskId: task6Id,
      proposalId: propId8,
      createdAt: new Date("2026-07-11T17:00:00Z"),
    },
  ];

  await paymentCol.insertMany(paymentsData);
  console.log(`Inserted ${paymentsData.length} payment transaction records.`);

  await client.close();
  console.log("Database seed completed successfully!");
}

seed().catch((err) => {
  console.error("Seed Error:", err);
  process.exit(1);
});
