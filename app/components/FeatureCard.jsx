export default function FeatureCard({ title, description }) {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl p-6 transition duration-300 text-gray-800">
      <h3 className="text-xl font-semibold mb-4 text-red-600">{title}</h3>
      <p>{description}</p>
    </div>
  );
}
