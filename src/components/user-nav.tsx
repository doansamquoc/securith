import { useActiveAccount, useActiveWallet, useDisconnect } from "thirdweb/react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuPortal,
} from "./ui/dropdown-menu";
import { useUser } from "@/hooks/use-user";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useTheme } from "./theme-provider";
import { IconChevronDown, IconLogout, IconMoon, IconSettings, IconSun, IconUserCircle } from "@tabler/icons-react";
import { ShimmerSkeleton } from "./unlumen-ui/shimmer-skeleton";
import { shortenAddress } from "@/utils/utils";
import CopyButton from "./copy-button";

const UserNav = () => {
  const account = useActiveAccount();
  const wallet = useActiveWallet();
  const { disconnect } = useDisconnect();
  const { isLoading } = useUser(account?.address);
  const { theme, setTheme } = useTheme();

  if (isLoading) return <ShimmerSkeleton className="h-10 w-32 rounded-full" />;

  const address = account?.address || "";

  const menuItems = [
    { label: "Hồ Sơ", icon: IconUserCircle },
    { label: "Cài Đặt", icon: IconSettings },
  ];

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 w-auto flex items-center gap-2 px-2 hover:bg-accent rounded-full transition-all border border-transparent hover:border-border"
        >
          <Avatar className="h-8 w-8 border border-border">
            <AvatarImage src={`https://api.dicebear.com/9.x/glass/svg?seed=${address}`} alt={address} />
            <AvatarFallback>{address.slice(2, 4).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="hidden sm:flex flex-col items-start text-left pr-1">
            <span className="text-xs font-bold leading-none">{shortenAddress(address)}</span>
            <span className="text-[10px] text-muted-foreground leading-none mt-1">{wallet?.id === "inApp" ? "Smart Account" : "External Wallet"}</span>
          </div>
          <IconChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-[12px] font-medium text-muted-foreground">Địa chỉ ví</p>
              <p className="text-xs font-mono font-medium truncate flex items-center justify-between">
                <span>{shortenAddress(address)}</span>
                <CopyButton textToCopy={address} size={"icon-xs"} variant={"outline"} />
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            {menuItems.map((item) => (
              <DropdownMenuItem key={item.label}>
                <item.icon className="mr-2" />
                <span>{item.label}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "light" && <IconSun className="mr-2" />}
              {theme === "dark" && <IconMoon className="mr-2" />}
              <span>Giao Diện</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuItem variant="destructive" onClick={() => wallet && disconnect(wallet)}>
            <IconLogout className="mr-2" />
            <span>Đăng xuất</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
};

export default UserNav;
