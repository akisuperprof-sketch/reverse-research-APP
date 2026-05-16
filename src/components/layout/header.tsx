"use client";

import React from "react";
import { Bell, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Header() {
  return (
    <header className="h-16 border-b bg-card/50 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between px-8">
      <div className="flex items-center flex-1 max-w-xl">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="キーワードやプロジェクトを検索..." 
            className="pl-10 h-10 bg-secondary/50 border-none rounded-xl focus-visible:ring-1 focus-visible:ring-primary/20 w-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-full relative">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-card" />
        </Button>
        <div className="flex items-center gap-3 ml-2 pl-4 border-l">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold leading-none">Akihiro Nishi</p>
            <p className="text-xs text-muted-foreground mt-1">無料プラン</p>
          </div>
          <Avatar className="w-9 h-9 border shadow-sm">
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary/10 text-primary font-bold">AN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
