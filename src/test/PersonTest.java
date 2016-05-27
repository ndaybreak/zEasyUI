package test;

import xiao.Person;

public class PersonTest {

	public static void main(String[] args) {
		Person person = new Person();
		person.setName("xiaoming");
		person.setAge(12);
		System.out.println(person.toString());
	}

}
