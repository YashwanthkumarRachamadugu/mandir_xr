import {
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
  increment,
  arrayUnion,
  arrayRemove,
  collection,
  addDoc,
  serverTimestamp,
  Timestamp,
  query,
  orderBy,
  where,
  getDocs
} from "firebase/firestore";
import type { User } from "firebase/auth";
import { db } from "./client";

// --- TYPES ---
export type Role = "user" | "tourist" | "volunteer" | "admin";
export type ApprovalStatus = "none" | "pending" | "approved" | "rejected";

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedAt: number;
}

export type UserProfile = {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  providers: string[];
  points: number;
  exploredStates: string[];
  achievements: string[];
  createdAt: number;
  lastLoginAt: number;
  updatedAt: number;
  generatedModels?: string[];
  // NEW FIELDS FOR ADMIN/ROLE FLOW
  role: Role;
  approvalStatus: ApprovalStatus;
  tasks: Task[];
};

export interface BlogPost {
  id?: string;
  title: string;
  author: string;
  authorId: string;
  excerpt: string;
  date: Timestamp | any;
  likes: number;
  comments: number;
  likedBy: string[];
  isPublic: boolean;
}

export interface TempleModel {
  id: string;
  templeName: string;
  modelUrl: string;
  thumbnailUrl: string;
  createdBy: string;
  status: "pending" | "completed" | "failed";
  createdAt: any;
  description?: string;
}

const getUserDocRef = (uid: string) => doc(db, "users", uid);

const providersFromUser = (user: User) =>
  Array.from(new Set((user.providerData || []).map((p) => p.providerId).filter(Boolean)));

// --- PROFILE LOGIC ---

export const ensureUserProfile = async (user: User): Promise<UserProfile> => {
  const ref = getUserDocRef(user.uid);
  const snap = await getDoc(ref);
  const now = Date.now();

  if (!snap.exists()) {
    const profile: UserProfile = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      providers: providersFromUser(user),
      points: 0,
      exploredStates: [],
      achievements: [],
      createdAt: now,
      lastLoginAt: now,
      updatedAt: now,
      role: "user", // Default role
      approvalStatus: "none",
      tasks: [],
    };
    await setDoc(ref, profile);
    return profile;
  }

  const existing = snap.data() as Partial<UserProfile>;
  const merged: UserProfile = {
    uid: user.uid,
    displayName: user.displayName ?? existing.displayName ?? null,
    email: user.email ?? existing.email ?? null,
    photoURL: user.photoURL ?? existing.photoURL ?? null,
    providers: providersFromUser(user),
    points: typeof existing.points === "number" ? existing.points : 0,
    exploredStates: Array.isArray(existing.exploredStates) ? existing.exploredStates : [],
    achievements: Array.isArray(existing.achievements) ? existing.achievements : [],
    createdAt: typeof existing.createdAt === "number" ? existing.createdAt : now,
    lastLoginAt: now,
    updatedAt: now,
    role: existing.role || "user",
    approvalStatus: existing.approvalStatus || "none",
    tasks: existing.tasks || [],
    generatedModels: existing.generatedModels || [],
  };

  await setDoc(ref, merged, { merge: true });
  return merged;
};

export const subscribeToUserProfile = (uid: string, callback: (profile: UserProfile | null) => void) => {
  const ref = getUserDocRef(uid);
  return onSnapshot(ref, (snap) => {
    callback(snap.exists() ? (snap.data() as UserProfile) : null);
  });
};

export const addPoints = async (uid: string, delta: number) => {
  const ref = getUserDocRef(uid);
  await updateDoc(ref, { points: increment(delta), updatedAt: Date.now() });
};

// --- ROLE & TASK ACTIONS (NEW) ---

export const requestRole = async (uid: string, requestedRole: "tourist" | "volunteer") => {
  const ref = getUserDocRef(uid);
  await updateDoc(ref, { 
    role: requestedRole, 
    approvalStatus: "pending", 
    updatedAt: Date.now() 
  });
};

// Only you (the Admin) should call these functions on the frontend
export const updateApprovalStatus = async (targetUid: string, status: ApprovalStatus) => {
  const ref = getUserDocRef(targetUid);
  await updateDoc(ref, { approvalStatus: status, updatedAt: Date.now() });
};

export const assignTaskToUser = async (targetUid: string, taskTitle: string, taskDescription: string) => {
  const ref = getUserDocRef(targetUid);
  const newTask: Task = {
    id: Date.now().toString(),
    title: taskTitle,
    description: taskDescription,
    assignedAt: Date.now()
  };
  await updateDoc(ref, { tasks: arrayUnion(newTask), updatedAt: Date.now() });
};

// --- BLOG ACTIONS ---
export const createBlogPost = async (post: Omit<BlogPost, "id" | "likes" | "comments" | "likedBy">) => {
  return await addDoc(collection(db, "blogs"), {
    ...post,
    likes: 0,
    comments: 0,
    likedBy: [],
    date: post.date || serverTimestamp(),
  });
};

export const updateBlogPost = async (postId: string, updates: Partial<BlogPost>) => {
  const blogRef = doc(db, "blogs", postId);
  return await updateDoc(blogRef, {
    ...updates,
    updatedAt: serverTimestamp(),
  });
};

export const toggleBlogVisibility = async (blogId: string, newState: boolean) => {
  const blogRef = doc(db, "blogs", blogId);
  await updateDoc(blogRef, { isPublic: newState });
};

export const toggleBlogLike = async (blogId: string, uid: string, isCurrentlyLiked: boolean) => {
  const blogRef = doc(db, "blogs", blogId);
  await updateDoc(blogRef, {
    likes: increment(isCurrentlyLiked ? -1 : 1),
    likedBy: isCurrentlyLiked ? arrayRemove(uid) : arrayUnion(uid),
  });
};

export const addBlogComment = async (postId: string, comment: { author: string; authorId: string; text: string; }) => {
  const colRef = collection(db, "blogs", postId, "comments");
  await addDoc(colRef, { ...comment, date: serverTimestamp() });
  const blogRef = doc(db, "blogs", postId);
  await updateDoc(blogRef, { comments: increment(1) });
};

// --- CUSTOM 3D MODEL ACTIONS ---
export const saveGeneratedModel = async (modelData: Omit<TempleModel, "id" | "createdAt">) => {
  const docRef = await addDoc(collection(db, "templeModels"), {
    ...modelData,
    createdAt: serverTimestamp(),
  });
  const userRef = getUserDocRef(modelData.createdBy);
  await updateDoc(userRef, {
    generatedModels: arrayUnion(docRef.id),
    points: increment(100)
  });
  return docRef.id;
};

export const subscribeToModels = (callback: (models: TempleModel[]) => void) => {
  const q = collection(db, "templeModels");
  return onSnapshot(q, (snapshot) => {
    const models = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as TempleModel[];
    callback(models);
  });
};