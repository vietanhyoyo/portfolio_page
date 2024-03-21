import Card from '@/components/card/card';
import { UserService } from '@/services/user.service';

type Props = {
  params: { locale: string };
};

const userService = new UserService();

const fetchData = async () => {
  try {
    const res = await userService.getUser();
    return res;
  } catch (error: any) {
    console.log(error);
  }
};

export default async function Home({ params: { locale } }: Props) {
  const apiData = await fetchData();

  return (
    <main className="bg-slate-100 h-screen p-3 text-slate-800">
      <Card>
        <h1>{apiData?.email}</h1>
      </Card>
    </main>
  );
}
