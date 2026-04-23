import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageSquare, Plus, Send, X, Globe, Lock, Clock, Edit3, CornerDownRight } from "lucide-react";
import { auth, db } from "@/integrations/firebase/client";
import { collection, query, orderBy, onSnapshot, Timestamp } from "firebase/firestore";
import { 
  createBlogPost, 
  toggleBlogLike, 
  toggleBlogVisibility, 
  updateBlogPost, 
  addBlogComment,
  BlogPost 
} from "@/integrations/firebase/userProfile";

// --- Sub-Component for Comments ---
const CommentSection = ({ postId, currentUser }: { postId: string, currentUser: any }) => {
  const [comments, setComments] = useState<any[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const q = query(collection(db, "blogs", postId, "comments"), orderBy("date", "asc"));
    return onSnapshot(q, (sc) => setComments(sc.docs.map(d => ({ id: d.id, ...d.data() }))));
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !currentUser) return;
    await addBlogComment(postId, {
      author: currentUser.displayName || "Traveler",
      authorId: currentUser.uid,
      text: text,
    });
    setText("");
  };

  return (
    <div className="mt-6 pt-6 border-t border-white/5">
      <div className="space-y-4 mb-6">
        {comments.map((c) => (
          <div key={c.id} className="flex gap-3 items-start group">
            <div className="w-8 h-8 rounded-full bg-white/10 flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-orange-500 border border-orange-500/20">
              {c.author ? c.author[0] : "T"}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">{c.author}</span>
                <span className="text-[10px] text-slate-600">{formatTimeAgo(c.date)}</span>
              </div>
              <p className="text-sm text-slate-400 mt-1">{c.text}</p>
              <button 
                onClick={() => setText(`@${c.author} `)}
                className="text-[10px] text-orange-500 font-bold mt-1 opacity-0 group-hover:opacity-100 transition"
              >
                Reply
              </button>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 bg-white/5 p-2 rounded-2xl border border-white/10 focus-within:border-orange-500/50 transition">
        <input 
          value={text} 
          onChange={(e) => setText(e.target.value)}
          placeholder={currentUser ? "Add a comment..." : "Sign in to join the conversation"}
          disabled={!currentUser}
          className="flex-1 bg-transparent px-3 py-1 text-sm outline-none text-white" 
        />
        <button type="submit" className="text-orange-500 p-2 hover:bg-orange-500 hover:text-white rounded-xl transition">
          <Send size={16} />
        </button>
      </form>
    </div>
  );
};

const formatTimeAgo = (date: any) => {
  if (!date) return "Just now";
  const postDate = date instanceof Timestamp ? date.toDate() : new Date(date);
  const now = new Date();
  const diff = Math.floor((now.getTime() - postDate.getTime()) / 1000);
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 84400) return `${Math.floor(diff / 3600)}h ago`;
  return postDate.toLocaleDateString();
};

// --- Main Page Component ---
const BlogPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null); // For Editing
  const [activeComments, setActiveComments] = useState<string | null>(null); // For showing comments
  const [newPost, setNewPost] = useState({ title: "", excerpt: "", isPublic: true });
  const [loading, setLoading] = useState(false);
  
  const currentUser = auth.currentUser;

  useEffect(() => {
    const q = query(collection(db, "blogs"), orderBy("date", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allBlogs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as BlogPost[];
      const visible = allBlogs.filter(p => p.isPublic || p.authorId === currentUser?.uid);
      setPosts(visible);
    });
    return () => unsubscribe();
  }, [currentUser]);

  const handleOpenEdit = (post: BlogPost) => {
    setEditingId(post.id!);
    setNewPost({ title: post.title, excerpt: post.excerpt, isPublic: post.isPublic });
    setIsModalOpen(true);
  };

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return alert("Please sign in!");
    setLoading(true);
    try {
      if (editingId) {
        // --- Edit Mode ---
        await updateBlogPost(editingId, newPost);
      } else {
        // --- Create Mode ---
        await createBlogPost({
          ...newPost,
          author: currentUser.displayName || "Traveler",
          authorId: currentUser.uid,
          date: Timestamp.now(), 
        });
      }
      setNewPost({ title: "", excerpt: "", isPublic: true });
      setEditingId(null);
      setIsModalOpen(false);
    } catch (err) { 
      console.error("Error:", err); 
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-200 p-6 pt-24 pb-32">
      <div className="container mx-auto max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-5xl font-black text-white mb-3">Travel <span className="text-orange-500">Stories</span></h1>
          <p className="text-slate-400">Read and share journeys across incredible India</p>
          <button 
            onClick={() => { setEditingId(null); setNewPost({title:"", excerpt:"", isPublic:true}); setIsModalOpen(true); }} 
            className="mt-8 flex items-center gap-2 mx-auto bg-white text-black px-6 py-3 rounded-2xl font-bold hover:bg-orange-500 hover:text-white transition-all shadow-xl active:scale-95"
          >
            <Plus size={20} /> Share Your Story
          </button>
        </motion.div>

        <div className="space-y-8">
          {posts.map((post) => {
            const isOwner = currentUser?.uid === post.authorId;
            const hasLiked = post.likedBy?.includes(currentUser?.uid || "");
            
            return (
              <motion.article key={post.id} layout className="bg-[#111] border border-white/5 rounded-[2.5rem] p-8 hover:border-orange-500/20 transition-all">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-600 to-yellow-500 flex items-center justify-center text-white font-bold">
                      {post.author ? post.author[0] : "T"}
                    </div>
                    <div>
                      <p className="font-bold text-white leading-none">{post.author}</p>
                      <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest flex items-center gap-1">
                        <Clock size={10} /> {formatTimeAgo(post.date)}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {isOwner && (
                      <button 
                        onClick={() => handleOpenEdit(post)}
                        className="p-2 bg-white/5 rounded-full text-slate-400 hover:text-orange-500 transition-colors"
                      >
                        <Edit3 size={16} />
                      </button>
                    )}
                    {isOwner && (
                      <button onClick={() => toggleBlogVisibility(post.id!, !post.isPublic)} className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold transition-all border ${post.isPublic ? "border-green-500/30 text-green-500 bg-green-500/5" : "border-slate-500/30 text-slate-500 bg-white/5"}`}>
                        {post.isPublic ? <><Globe size={12}/> Public</> : <><Lock size={12}/> Private</>}
                      </button>
                    )}
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-white mb-3">{post.title}</h2>
                <p className="text-slate-400 leading-relaxed mb-8 italic">"{post.excerpt}"</p>
                
                <div className="flex items-center gap-6 pt-6 border-t border-white/5">
                  <button disabled={!currentUser} onClick={() => toggleBlogLike(post.id!, currentUser!.uid, !!hasLiked)} className={`flex items-center gap-2 transition-colors ${hasLiked ? "text-orange-500" : "text-slate-500 hover:text-orange-500"}`}>
                    <Heart size={20} fill={hasLiked ? "currentColor" : "none"} />
                    <span className="font-bold">{post.likes || 0}</span>
                  </button>
                  <button 
                    onClick={() => setActiveComments(activeComments === post.id ? null : post.id!)}
                    className={`flex items-center gap-2 transition-colors ${activeComments === post.id ? "text-white" : "text-slate-500 hover:text-white"}`}
                  >
                    <MessageSquare size={20} />
                    <span className="font-bold">{post.comments || 0}</span>
                  </button>
                </div>

                {/* --- Comments Section Toggle --- */}
                {activeComments === post.id && (
                  <CommentSection postId={post.id!} currentUser={currentUser} />
                )}
              </motion.article>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/90 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-[#0f0f0f] border border-white/10 w-full max-w-xl rounded-[3rem] p-10 shadow-2xl">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-black text-white">{editingId ? "Update your story" : "Tell your story"}</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-white transition">
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handlePost} className="space-y-6">
                <input required placeholder="Title of your journey" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-orange-500 outline-none transition text-white" value={newPost.title} onChange={(e) => setNewPost({...newPost, title: e.target.value})} />
                <textarea required rows={5} placeholder="What happened on your trip?" className="w-full bg-white/5 border border-white/10 rounded-3xl px-6 py-4 focus:border-orange-500 outline-none transition resize-none text-white" value={newPost.excerpt} onChange={(e) => setNewPost({...newPost, excerpt: e.target.value})} />
                
                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                   <p className="text-sm font-bold text-slate-400">Post Visibility:</p>
                   <button type="button" onClick={() => setNewPost({...newPost, isPublic: true})} className={`px-4 py-2 rounded-xl text-xs font-bold transition ${newPost.isPublic ? "bg-orange-500 text-white" : "text-slate-500 hover:text-white"}`}>Public</button>
                   <button type="button" onClick={() => setNewPost({...newPost, isPublic: false})} className={`px-4 py-2 rounded-xl text-xs font-bold transition ${!newPost.isPublic ? "bg-slate-700 text-white" : "text-slate-500 hover:text-white"}`}>Private</button>
                </div>

                <button type="submit" disabled={loading} className="w-full bg-orange-600 hover:bg-orange-500 text-white font-black py-5 rounded-2xl flex items-center justify-center gap-2 transition disabled:opacity-50">
                  {loading ? "Publishing..." : <><Send size={20} /> {editingId ? "Update Story" : "Publish Story"}</>}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlogPage;