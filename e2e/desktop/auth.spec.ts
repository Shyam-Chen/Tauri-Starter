describe('Sign-in', () => {
  it('title', async () => {
    const header = await $('body diev.font-bold.text-xl');
    const text = await header.getText();
    expect(text).toMatch('Sign in to our platform');
  });
});
