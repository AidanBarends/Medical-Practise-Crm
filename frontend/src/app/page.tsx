import Sidebar from '@/components/layout/Sidebar';

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="p-6">
        <p className="text-gray-500">Main content will go here.</p>
      </main>
    </div>
  );
}