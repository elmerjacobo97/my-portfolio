import { useNavigate, useRouter } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';

export default function GeneralError() {
  const navigate = useNavigate();
  const { history } = useRouter();

  return (
    <div className="h-svh">
      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
        <h1 className="text-[7rem] font-bold leading-tight">500</h1>
        <span className="font-medium">¡Ups! Algo salió mal</span>
        <p className="text-center text-muted-foreground">
          Parece que algo salió mal <br />
          intenta recargar la página.
        </p>
        <div className="mt-6 flex gap-4">
          <Button variant="outline" onClick={() => history.go(-1)}>
            Volver
          </Button>
          <Button onClick={() => navigate({ to: '/' })}>Volver al inicio</Button>
        </div>
      </div>
    </div>
  );
}
