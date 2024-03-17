// http POST http://localhost:3000/posts/edit title="mango" description="mango is a fruit" content="mangoes are tasty."
export const actions = {
  default: async({request})=>{
    const data = Object.fromEntries(await request.formData());
    console.log(data);
    // { title: 'mango', description: 'mangoes', content: 'more mangoes' }
		const response = await fetch('http://localhost:3000/posts/edit', {
			method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
			body: JSON.stringify(data)
		});    
    if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
    } else {
        console.error('Failed to send data to the backend');
    }
  }
};
