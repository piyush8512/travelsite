-- Insert sample destinations
INSERT INTO destinations (name, description, price, image_url, location, duration, rating, featured) VALUES
('Tropical Paradise Bali', 'Experience the magic of Bali with pristine beaches, ancient temples, and vibrant culture. Perfect for relaxation and adventure.', 1299.99, '/placeholder.svg?height=400&width=600', 'Bali, Indonesia', '7 days', 4.8, true),
('Swiss Alps Adventure', 'Breathtaking mountain views, world-class skiing, and charming alpine villages await you in the Swiss Alps.', 2199.99, '/placeholder.svg?height=400&width=600', 'Switzerland', '10 days', 4.9, true),
('Tokyo Cultural Journey', 'Immerse yourself in the perfect blend of traditional and modern Japan. From ancient temples to neon-lit streets.', 1899.99, '/placeholder.svg?height=400&width=600', 'Tokyo, Japan', '8 days', 4.7, true),
('Santorini Sunset Escape', 'Romantic getaway with stunning sunsets, white-washed buildings, and crystal-clear waters of the Aegean Sea.', 1599.99, '/placeholder.svg?height=400&width=600', 'Santorini, Greece', '6 days', 4.6, false),
('African Safari Experience', 'Witness the Big Five in their natural habitat on this unforgettable safari adventure through Kenya and Tanzania.', 3299.99, '/placeholder.svg?height=400&width=600', 'Kenya & Tanzania', '12 days', 4.9, true),
('Northern Lights Iceland', 'Chase the Aurora Borealis while exploring glaciers, geysers, and the dramatic landscapes of Iceland.', 2499.99, '/placeholder.svg?height=400&width=600', 'Reykjavik, Iceland', '9 days', 4.8, false);

-- Insert sample admin user (password: admin123)
INSERT INTO users (email, password_hash, role) VALUES
('admin@travelagency.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');
