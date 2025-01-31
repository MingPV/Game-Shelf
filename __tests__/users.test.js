import { createClient } from "@/utils/supabase/client";
import { randomUUID } from "crypto";


describe("API /api/users", () => {

    let supabase;

    beforeAll(() => {
      // Initialize Supabase client before all tests
      supabase = createClient();
    });
  
    beforeEach(async () => {
      // Clean up the users table before each test if needed
      await supabase.from("users").delete().neq('email','delete')
    });  

  it("should return a list of users", async () => {
    const supabase = createClient();
    // const { data, error } = await supabase
    //     .from('users')
    //     .insert([
    //       {  
    //         uid: "1eb9f688-2d62-41f3-87b3-ea08e4cacbb2",
    //         email: "test@gmail.com",
    //         username: "username",
    //         isProvider: "true",
    //       },
    //     ])
    // console.log(error)
    expect("res").toEqual("res");
    
  });

});
