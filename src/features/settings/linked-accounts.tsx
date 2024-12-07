import { github_login } from "@/services/user";
import { Github } from "lucide-react";
import pb from "@/pocketbase";
import { useQuery } from "@tanstack/react-query";
import { query_client } from "@/stores/query";

const LinkedAccounts = ({ user }) => {
  const { data: linked_github, isLoading } = useQuery({
    queryKey: ["linked_github"],
    queryFn: () =>
      pb
        .collection("_externalAuths")
        .getFirstListItem(`recordRef="${user.id}" && provider="github"`)
        .then((result) => {
          return !!result;
        }),
  });

  const unlink_github = () => {
    pb.collection("users")
      .unlinkExternalAuth(user.id, "github")
      .then(() => query_client.refetchQueries({ queryKey: ["linked_github"] }));
  };

  return (
    <div class="grid lg:grid-cols-2">
      <div class="prose mb-8">
        <p class="font-black">Linked accounts</p>
        <p class="">Add or remove OAuth2 accounts.</p>
      </div>
      <div class="max-w-sm">
        {isLoading && (
          <button class="btn w-full skeleton" disabled={true}>
            <Github />
            Github
          </button>
        )}
        {!isLoading &&
          (linked_github ? (
            <button onClick={unlink_github} class="btn w-full btn-error">
              <Github />
              Unlink Github
            </button>
          ) : (
            <button
              onClick={() =>
                github_login().then(() =>
                  query_client.refetchQueries({
                    queryKey: ["linked_github"],
                  }),
                )
              }
              class="btn w-full btn-primary"
            >
              <Github />
              Link Github
            </button>
          ))}
      </div>
    </div>
  );
};

export default LinkedAccounts;
