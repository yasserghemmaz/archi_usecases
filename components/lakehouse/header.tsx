"use client"

import { BookOpen } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface HeaderProps {
  activePage?: "cx" | "vue360"
}

export function Header({ activePage = "cx" }: HeaderProps) {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="font-semibold text-foreground">Use cases Data</h1>
              <p className="text-xs text-muted-foreground">Document de Reference - Orange Maroc</p>
            </div>
          </div>
          
          <nav className="hidden items-center gap-1 md:flex">
            <Link
              href="/"
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                activePage === "cx"
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
              )}
            >
              Use cases CX
            </Link>
            <Link
              href="/vue-360"
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                activePage === "vue360"
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
              )}
            >
              Use Case Vue 360
            </Link>
          </nav>
        </div>
        <div className="hidden items-center gap-4 sm:flex">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Orange_logo.svg/1200px-Orange_logo.svg.png"
            alt="Orange Logo"
            width={80}
            height={80}
            style={{ height: "32px", width: "auto" }}
          />
        </div>
      </div>
    </header>
  )
}
