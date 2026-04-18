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
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
} from "./ui/dropdown-menu";
import { useUser } from "@/hooks/use-user";
import { Skeleton } from "./ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useTheme } from "./theme-provider";
import {
  IconBell,
  IconCheck,
  IconChevronDown,
  IconDeviceDesktop,
  IconLogout,
  IconMoon,
  IconSettings,
  IconSun,
  IconUserCircle,
} from "@tabler/icons-react";

const UserNav = () => {
  const account = useActiveAccount();
  const wallet = useActiveWallet();
  const { disconnect } = useDisconnect();
  const { isLoading } = useUser(account?.address);
  const { theme, setTheme } = useTheme();

  if (isLoading) return <Skeleton className="h-10 w-32 rounded-full" />;

  const address = account?.address || "";
  const shortAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;

  const menuItems = [
    { label: "Profile", icon: IconUserCircle },
    { label: "Settings", icon: IconSettings },
    { label: "Notifications", icon: IconBell },
  ];

  const themeOptions = [
    { label: "Light", value: "light", icon: IconSun },
    { label: "Dark", value: "dark", icon: IconMoon },
    { label: "System", value: "system", icon: IconDeviceDesktop },
  ];

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 w-auto flex items-center gap-2 px-2 hover:bg-accent rounded-full transition-all border border-transparent hover:border-border"
        >
          <Avatar className="h-8 w-8 border border-border">
            <AvatarImage src={`https://api.dicebear.com/7.x/identicon/svg?seed=${address}`} alt={address} />
            <AvatarFallback>{address.slice(2, 4).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start text-left pr-1 hidden sm:flex">
            <span className="text-xs font-bold leading-none">{shortAddress}</span>
            <span className="text-[10px] text-muted-foreground leading-none mt-1">
              {wallet?.id === "inApp" ? "Smart Account" : "External Wallet"}
            </span>
          </div>
          <IconChevronDown className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent className="w-56" align="start">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none text-muted-foreground uppercase tracking-wider text-[10px]">
                Active Wallet
              </p>
              <p className="text-xs font-mono font-medium truncate">{address}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            {menuItems.map((item) => (
              <DropdownMenuItem key={item.label}>
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.label}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <IconSun className="mr-2 h-4 w-4 dark:hidden" />
                <IconMoon className="mr-2 h-4 w-4 hidden dark:block" />
                <span>Theme</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {themeOptions.map((option) => (
                    <DropdownMenuItem
                      key={option.value}
                      onClick={() => setTheme(option.value as any)}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <option.icon className="mr-2 h-4 w-4" />
                        <span>{option.label}</span>
                      </div>
                      {theme === option.value && <IconCheck className="h-4 w-4" />}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="text-destructive focus:text-destructive cursor-pointer focus:bg-destructive/10"
            onClick={() => wallet && disconnect(wallet)}
          >
            <IconLogout className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
};

export default UserNav;
