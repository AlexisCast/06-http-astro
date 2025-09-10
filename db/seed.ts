import { Clients, db } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {

	console.log('Seeding database...');

	await db.insert(Clients).values([
		{ id: 1, name: "Kasim", age: 28, isActive: true },
		{ id: 2, name: "Mina", age: 34, isActive: false },
		{ id: 3, name: "Liam", age: 45, isActive: true },
		{ id: 4, name: "Sophia", age: 23, isActive: true },
		{ id: 5, name: "Ethan", age: 37, isActive: false },
	]);

	console.log('Database seeded...');
}
