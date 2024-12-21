CREATE OR REPLACE FUNCTION handle_public_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER AS $$
BEGIN
    INSERT INTO public.user_profile(id)
    VALUES (NEW.id);
    RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION handle_public_user();
