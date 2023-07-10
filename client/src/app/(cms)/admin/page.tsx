import { redirect } from "next/navigation";
import SignInForm from "./SignInForm";

export default function Admin() {
  const user = "Boris";

  if (!user) {
    //redirect("/");
    return <SignInForm />;
  } else {
    redirect("/admin/dashboard");
  }
}
