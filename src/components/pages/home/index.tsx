import { useNavigate } from "@solidjs/router";
import { onMount } from "solid-js";
import { getRandomNumber } from "../../../services/random.service";

export default () => {
  const navigate = useNavigate();
  onMount(() => {
    setTimeout(() => {
      const paths = ["/grader", "/shader", "/converter"];
      const index = getRandomNumber(0, paths.length - 1);
      navigate(paths[index]);
    }, 500);
  });
  return <div></div>;
};
