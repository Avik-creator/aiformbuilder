'use server'

import { auth } from "@/auth"
import { db } from "@/lib/db"
import { users } from "@/lib/schema"
import { eq } from "drizzle-orm"

export async function getForms() {
  const session = await auth()

  if (!session?.user?.email) {
    return []
  }

  



  const user = await db.query.users.findFirst({
    where: eq(users.email, session?.user?.email),
    with: {
      forms: true
    }
  })



  return user?.forms || []
}
