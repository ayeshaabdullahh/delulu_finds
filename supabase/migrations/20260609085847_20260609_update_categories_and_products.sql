-- Delete all existing products
DELETE FROM saved_items;
DELETE FROM products;

-- Insert 20 new fashion products
INSERT INTO products (name, slug, description, image_url, affiliate_url, price, original_price, source, category, aesthetic_tags, is_featured, is_new_arrival, sort_order) VALUES
('Floral Midi Dress', 'floral-midi-dress', 'A dreamy floral midi dress perfect for spring brunches and garden parties. Features a soft sweetheart neckline and flowing skirt.', 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800', '#', '$42.00', '$65.00', 'Amazon', 'Clothing', ARRAY['#CoquetteCore'], true, false, 1),

('Oversized Blazer', 'oversized-blazer', 'This chic oversized blazer in a warm caramel tone adds instant sophistication to any outfit. Perfect for work and weekend wear.', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800', '#', '$38.00', '$58.00', 'Amazon', 'Clothing', ARRAY['#OldMoney'], true, false, 2),

('Silk Blouse', 'silk-blouse', 'Luxurious silk blouse in champagne with delicate pearl buttons. The ultimate wardrobe staple for a polished look.', 'https://images.unsplash.com/photo-1605763240004-7e93b172d754?auto=format&fit=crop&w=800', '#', '$45.00', NULL, 'Etsy', 'Clothing', ARRAY['#SoftGlamour'], false, true, 3),

('White Leather Sneakers', 'white-leather-sneakers', 'Clean, minimalist white leather sneakers that go with literally everything. The definition of a capsule wardrobe essential.', 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800', '#', '$55.00', '$89.00', 'Amazon', 'Shoes', ARRAY['#CleanGirl'], true, false, 4),

('Red Suede Stilettos', 'red-suede-stilettos', 'Bold red suede stilettos that make a statement. The perfect pop of color for date nights and special occasions.', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800', '#', '$48.00', '$72.00', 'Amazon', 'Shoes', ARRAY['#Barbiecore'], true, false, 5),

('Knee-High Leather Boots', 'knee-high-leather-boots', 'Classic knee-high leather boots in rich espresso. Timeless elegance meets everyday comfort.', 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800', '#', '$89.00', NULL, 'Amazon', 'Shoes', ARRAY['#OldMoney'], false, true, 6),

('Oversized Canvas Tote', 'oversized-canvas-tote', 'A spacious canvas tote bag in cream with leather straps. Perfect for your daily essentials and laptop.', 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800', '#', '$32.00', '$48.00', 'Etsy', 'Bags', ARRAY['#CleanGirl'], true, false, 7),

('Mini Quilted Crossbody', 'mini-quilted-crossbody', 'Adorable mini quilted crossbody in soft blush pink. Just the right size for your phone, cards, and lipstick.', 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800', '#', '$28.00', '$45.00', 'Amazon', 'Bags', ARRAY['#CoquetteCore'], false, true, 8),

('Gold Chain Necklace', 'gold-chain-necklace', 'Delicate gold chain necklace with a tiny heart pendant. Layer it or wear it solo for an understated look.', 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=800', '#', '$18.00', '$32.00', 'Etsy', 'Jewelry', ARRAY['#CleanGirl'], false, true, 9),

('Stacked Pearl Rings', 'stacked-pearl-rings', 'Set of three pearl-accented rings in gold plating. Elegant and stackable for a curated jewelry look.', 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800', '#', '$24.00', NULL, 'Etsy', 'Jewelry', ARRAY['#SoftGlamour'], true, false, 10),

('Silk Hair Scarf', 'silk-hair-scarf', 'Gorgeous silk hair scarf in vintage floral print. Tie it around your ponytail, neck, or bag handle for instant flair.', 'https://images.unsplash.com/photo-1521369909029-2afed882ba7d?auto=format&fit=crop&w=800', '#', '$15.00', '$22.00', 'Etsy', 'Accessories', ARRAY['#CoquetteCore'], false, true, 11),

('Cat-Eye Sunglasses', 'cat-eye-sunglasses', 'Retro-inspired cat-eye sunglasses in tortoiseshell. The ultimate accessory for a mysterious, glamorous vibe.', 'https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?auto=format&fit=crop&w=800', '#', '$22.00', '$35.00', 'Amazon', 'Accessories', ARRAY['#Y2KVibes'], true, false, 12),

('Matte Lipstick Trio', 'matte-lipstick-trio', 'Set of three long-lasting matte lipsticks in nude, rose, and berry. Creamy, pigmented, and hydrating.', 'https://images.unsplash.com/photo-1596462502278-27bfdd403348?auto=format&fit=crop&w=800', '#', '$19.00', '$28.00', 'Amazon', 'Beauty', ARRAY['#CleanGirl'], false, true, 13),

('Floral Perfume', 'floral-perfume', 'A delicate floral perfume in a gorgeous vintage-inspired bottle. Notes of jasmine, rose, and vanilla.', 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800', '#', '$34.00', NULL, 'Amazon', 'Beauty', ARRAY['#SoftGlamour'], true, false, 14),

('French Press-On Nails', 'french-press-on-nails', 'Reusable press-on nails in a classic French manicure. Salon-quality nails at home in minutes.', 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800', '#', '$12.00', '$18.00', 'Amazon', 'Nails', ARRAY['#CleanGirl'], false, true, 15),

('Gel Nail Kit', 'gel-nail-kit', 'Complete gel nail kit with LED lamp, 6 colors, and top coat. Perfect for DIY manicures at home.', 'https://images.unsplash.com/photo-1631730359585-38a4935cbec4?auto=format&fit=crop&w=800', '#', '$29.00', '$45.00', 'Amazon', 'Nails', ARRAY['#SoftGlamour'], false, true, 16),

('Black Cut-Out Bikini', 'black-cut-out-bikini', 'Stylish black bikini with subtle cut-out details. Minimalist, flattering, and perfect for poolside lounging.', 'https://images.unsplash.com/photo-1570158268183-d296b2892211?auto=format&fit=crop&w=800', '#', '$35.00', '$52.00', 'Amazon', 'Swimwear', ARRAY['#CleanGirl'], true, false, 17),

('Ribbed One Piece Swimsuit', 'ribbed-one-piece-swimsuit', 'Elegant ribbed one-piece swimsuit in sage green. High-cut legs and a scoop back for a flattering silhouette.', 'https://images.unsplash.com/photo-1582993722468-c93a1c950d88?auto=format&fit=crop&w=800', '#', '$48.00', NULL, 'Amazon', 'Swimwear', ARRAY['#SoftGlamour'], false, true, 18),

('Black Open-Front Abaya', 'black-open-front-abaya', 'Flowy black open-front abaya with subtle gold trim. Comfortable, elegant, and perfect for everyday wear.', 'https://images.unsplash.com/photo-1549233374-b5980cdce4bd?auto=format&fit=crop&w=800', '#', '$52.00', '$78.00', 'Amazon', 'Abayas', ARRAY['#ModestChic'], true, false, 19),

('Pastel Paisley Hijab', 'pastel-paisley-hijab', 'Soft cotton hijab in pastel paisley print. Lightweight, breathable, and absolutely gorgeous for any season.', 'https://images.unsplash.com/photo-1604525731092-dfe46c7876a3?auto=format&fit=crop&w=800', '#', '$16.00', '$24.00', 'Etsy', 'Scarves', ARRAY['#HijabFashion'], true, true, 20);
