import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PageHeader } from "@/components/page-header";

const fields = [
  { label: "First Name", defaultValue: "Leonardo" },
  { label: "Last Name", defaultValue: "Ahmed" },
  { label: "Location", defaultValue: "Sylhet Bangladesh" },
];

export default function EditProfilePage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Edit Profile"
        action={
          <Link
            href="/profile"
            className="block text-right text-sm font-semibold text-action hover:underline"
          >
            Done
          </Link>
        }
      />

      <section className="flex flex-col items-center gap-3">
        <Avatar className="size-24">
          <AvatarImage src="https://i.pravatar.cc/192?img=12" alt="Leonardo" />
          <AvatarFallback>L</AvatarFallback>
        </Avatar>
        <h2 className="text-2xl font-medium tracking-tight">Leonardo</h2>
        <button type="button" className="text-base font-medium text-action hover:underline">
          Change Profile Picture
        </button>
      </section>

      <form className="flex flex-col gap-6">
        {fields.map((f) => (
          <label key={f.label} className="flex flex-col gap-2">
            <span className="text-base font-medium tracking-wide">{f.label}</span>
            <input
              type="text"
              defaultValue={f.defaultValue}
              className="h-12 rounded-2xl border-none bg-muted px-4 text-base focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </label>
        ))}

        <label className="flex flex-col gap-2">
          <span className="text-base font-medium tracking-wide">Mobile Number</span>
          <div className="flex h-12 items-center gap-2 rounded-2xl bg-muted px-4">
            <span className="inline-flex items-center gap-1 text-base text-muted-foreground">
              +88
              <ChevronDown className="size-4" />
            </span>
            <input
              type="tel"
              defaultValue="01758-000666"
              className="flex-1 border-none bg-transparent text-base focus:outline-none"
            />
          </div>
        </label>
      </form>
    </div>
  );
}
