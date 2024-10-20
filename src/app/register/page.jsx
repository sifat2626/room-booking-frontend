"use client";
import { axiosCommon } from "@/app/hooks/useAxios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react"; // Import signIn
import { useRouter } from "next/navigation"; // Import useRouter for redirection

function Page() {
  const router = useRouter(); // Initialize router for redirection

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    const postBody = {
      name,
      email,
      password,
    };

    try {
      const { data } = await axiosCommon.post("/users/register", postBody, {
        withCredentials: true,
      });

      console.log(data);
      toast.success("Registration successful");

      // Automatically log in the user
      const loginResponse = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (loginResponse?.error) {
        toast.error("Login failed. Please try again.");
      } else {
        // Redirect to another page after successful login
        router.push("/"); // Change this path as needed
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div>
      <h3>Register</h3>
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
        <form className="card-body" onSubmit={handleRegister}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="name"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="password"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary" type="submit">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Page;
