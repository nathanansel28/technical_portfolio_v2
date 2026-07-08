import Image from "next/image";

export default function ProfilePicture() {
  return (
    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border border-black/10 sm:h-28 sm:w-28">
      <Image
        src="/profile.jpg"
        alt="Portrait of Nathan Ansel"
        fill
        sizes="112px"
        className="object-cover"
        priority
      />
    </div>
  );
}
