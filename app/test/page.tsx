import { prisma } from "@/lib/db";

export default async function TestPage() {
  const voices = await prisma.voice.findMany();

  return (
    <div className="p-8">
      <h1>Voice {voices.length}</h1>
      <ul className="spacey-2">
        {voices.map((voice) => (
          <li key={voice.id}>
            {voice.name} - {voice.variant}
          </li>
        ))}
      </ul>
    </div>
  );
}
