import UserImage from "../../../assets/images/user-img.png";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";

// حددنا نوع Props
interface DropdownMenuBasicProps {
  logout: () => void; // logout دالة بدون مدخلات ومخرجات
}

export function DropdownMenuBasic({ logout }: DropdownMenuBasicProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="flex flex-col items-center">
        <Image
          alt="user"
          src={UserImage}
          width={40}
          height={40}
          className="rounded-full w-10 h-10 object-cover"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href={"/profile"}>Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span onClick={logout} className="cursor-pointer">
              LogOut
            </span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
