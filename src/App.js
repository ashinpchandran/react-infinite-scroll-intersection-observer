import React, { useState, useRef, useEffect, useCallback } from 'react';
import './style.css';

const LIMIT = 10;
export default function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const observerRef = useRef(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${LIMIT}`
        );
        if (!response.ok) {
          throw new Error(`HTTP Error status:${response.status}`);
        }
        const json = await response.json();
        if (json.length === 0) {
          setHasMore(false);
        } else {
          setLoading(false);
          setPosts((prev) => {
            const existingIds = new Set(prev.map((post) => post.id));
            const uniqueNewPosts = json.filter(
              (post) => !existingIds.has(post.id)
            );
            return [...prev, ...uniqueNewPosts];
          });
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [page]);

  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && !loading && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    },
    [loading, hasMore]
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.unobserve(observerRef.current);
  }, [handleObserver]);
  return (
    <div>
      <h1>Infinite Scrolling</h1>
      <div>
        {posts.map((post) => (
          <div
            key={post.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '10px',
              padding: '15px',
              marginBottom: '20px',
            }}
          >
            <h3>
              {post.id}.{post.title}
            </h3>
          </div>
        ))}
      </div>
      <div
        ref={observerRef}
        style={{ height: '40px', textAlign: 'center', margin: '20px 0' }}
      >
        {loading && <p>loading more...</p>}
        {!hasMore && <p>End of the posts</p>}
      </div>
    </div>
  );
}
