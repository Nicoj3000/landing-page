"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Dock, DockIcon } from "./magicui/dock";
import { DATA } from "@/data";

export function Navbar() {
  const { t } = useTranslation();
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto mb-20 flex origin-bottom h-full max-h-14">
      {/* Background Blur */}
      <div className="fixed bottom-0 inset-x-0 h-16 w-full bg-background to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)] dark:bg-background"></div>

        {/* Dock Container */}
        <Dock
          className="z-50 pointer-events-auto relative mx-auto flex min-h-full h-full items-center px-1 bg-background rounded-2xl shadow-lg"
        >
          {/* Navbar Items */}
          {DATA.navbar.map((item) => (
            <DockIcon key={item.labelKey}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    aria-label={t(item.labelKey)}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-12 rounded-full "
                    )}
                  >
                    <item.icon className="size-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t(item.labelKey)}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}

          {/* Separators */}
          <Separator orientation="vertical" className="h-full" />
          {Object.entries(DATA.contact.social).map(([name, social]) => (
            <DockIcon key={name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={social.url}
                    aria-label={t(social.labelKey)}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-12 rounded-full hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    <social.icon className="size-4 dark:text-white" />
                  </Link>
                </TooltipTrigger>

                <TooltipContent>
                  <p>{t(social.labelKey)}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}

          {/* Separators */}
          <Separator orientation="vertical" className="h-full" />

          {DATA.mail.map((item) => (
            <DockIcon key={item.labelKey}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    aria-label={t(item.labelKey)}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-12 rounded-full hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    <item.icon className="size-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t(item.labelKey)}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
        </Dock>
    </div>
  );
}
