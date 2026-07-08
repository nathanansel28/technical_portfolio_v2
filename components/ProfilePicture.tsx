import Image from "next/image";

export default function ProfilePicture() {
  return (
    <div className="relative h-80 w-80 shrink-0 overflow-hidden rounded-full border border-black/10 sm:h-80 sm:w-80">
      <Image
        src="/profile.jpg"
        alt="Portrait of Nathan Ansel"
        fill
        sizes="3200px"
        className="object-cover"
        priority
      />
    </div>
  );
}
