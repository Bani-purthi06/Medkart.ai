import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getWatchlist } from "@/api/watchlist";
import { useUiStore } from "@/store/uiStore";

export function useWatchlist() {
  const queryClient = useQueryClient();
  const addToast = useUiStore((state) => state.addToast);
  const query = useQuery({ queryKey: ["watchlist"], queryFn: getWatchlist });
  const saveTarget = useMutation({
    mutationFn: async (_values: { medicineId: number; targetPrice: number }) => true,
    onSuccess: () => {
      addToast({ tone: "success", message: "Watchlist target saved" });
      queryClient.invalidateQueries({ queryKey: ["watchlist"] });
    },
    onError: () => addToast({ tone: "error", message: "Could not save target price" }),
  });
  return { ...query, saveTarget };
}
